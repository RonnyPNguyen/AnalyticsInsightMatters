import requests
import json
import boto3

def lambda_handler(event, context):
    # Your code goes here, wrapped in this function
    cpiUrl = "https://data.api.abs.gov.au/rest/data/ABS,CPI,1.1.0/3.10001.10.50.Q?lastNObservations=20&detail=dataonly"
    wpiUrl = "https://data.api.abs.gov.au/rest/data/ABS,WPI,1.2.0/3.THRPIB.2.TOT.10.AUS.Q?lastNObservations=20&detail=dataonly" 
    rentUrl = "https://data.api.abs.gov.au/rest/data/ABS,CPI,1.1.0/3.30014.10.50.Q?lastNObservations=20&detail=dataonly"
    saleUrl = "https://Url.api.abs.gov.au/rest/data/ABS,AUSTRALIAN_INDUSTRY,1.1.0/INCSALGDSSERV..1..A?lastNObservations=5&detail=dataonly"
    cogsUrl = "https://Url.api.abs.gov.au/rest/data/ABS,AUSTRALIAN_INDUSTRY,1.1.0/PURCHASES..1..A?lastNObservations=5&detail=dataonly"

    headers = {
        "Accept": "application/vnd.sdmx.data+json"  
    }

    def fetch_raw_json(name, url):
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            return
        print(f"Failed to fetch {name}: {response.status_code} - {response.text}")

    def AusIndustryUrl (measure, industry='', region=''):
        return f"https://data.api.abs.gov.au/rest/data/ABS,AUSTRALIAN_INDUSTRY,1.1.0/{measure}.{industry}.1.{region}.A?lastNObservations=5&detail=dataonly"
    
    capitalsKeys = {
        "Sydney": "1",
        "Melbourne": "2",
        "Brisbane": "3",
        "Adelaide": "4",
        "Perth": "5",
        "Hobart": "6",
        "Darwin": "7",
        "Canberra": "8"}

    regionKeys = {
        "New South Wales": "1",
        "Victoria": "2",
        "Queensland": "3",
        "South Australia": "4",
        "Western Australia": "5",
        "Tasmania": "6",
        "Northern Territory": "7",
        "Australian Capital Territory": "8",
    }
    industryKeys = {
        "Wholesale Trade": "F",
        "Retail Trade": "G",
        "Accommodation and Food Services": "H",
        "Transport, Postal and Warehousing": "I",
        "Information Media and Telecommunications": "J",
        "Rental, Hiring and Real Estate Services": "L",
        "Administrative and Support Services": "N",
        "Education and Training": "P",
        "Health Care and Social Assistance": "Q",
        "Arts and Recreation Services": "R",
        "Other Services": "S",    
    }
    divisionKeys = {
        'Motor vehicle and motor vehicle parts retailing':'39',
        'Fuel retailing':'40',
        'Food retailing':'41',
        'Other store-based retailing':'42',
        'Non-store retailing and retail commission-based buying and/or selling':'43',
        'Accommodation':'44',
        'Food and beverage services':'45',
        'Rental and hiring services (except real estate)': '66',
        'Real estate services': '67',
        'Nail, Hair, and Skin care service':'95',
}

    cpiData = fetch_raw_json("CPI Data", cpiUrl)
    cpiData = cpiData["data"]["dataSets"][0]["series"]["0:0:0:0:0"]["observations"]
    cpiValues = [float(v[0]) for v in cpiData.values()]
    cpiAvg = sum(cpiValues) / len(cpiValues)
    cpiAvg

    wpiData = fetch_raw_json("WPI Data", wpiUrl)
    wpiData = wpiData["data"]["dataSets"][0]["series"]["0:0:0:0:0:0:0"]["observations"]
    wpiValues = [float(v[0]) for v in wpiData.values()]
    wpiAvg = sum(wpiValues) / len(wpiValues)
    wpiAvg

    rentalYields = {}
    for key in capitalsKeys:
        try:
            rentalData = fetch_raw_json(f"Rental Data for {key}", f"https://data.api.abs.gov.au/rest/data/ABS,CPI,1.1.0/3.30014.10.{capitalsKeys[key]}.Q?lastNObservations=20&detail=dataonly")["data"]["dataSets"][0]["series"]["0:0:0:0:0"]["observations"]
            rentalIndex = [float(v[0]) for v in rentalData.values()]
            avgRentalYield = round(sum(rentalIndex) / len(rentalIndex), 2)
            rentalYields[key] = avgRentalYield
        except Exception as e:
            rentalYields[key] = None

    dataByState = {}
    for key in regionKeys:
        try:
            data = fetch_raw_json(f"Sales Data for {key}", AusIndustryUrl("INCSALGDSSERV", region = regionKeys[key]))["data"]["dataSets"][0]["series"]["0:0:0:0:0"]["observations"]
            sale = [float(v[0]) for v in data.values()]
            dataByState[key] = {"Sales": sale,
                            "CAGR": round(((sale[0] / sale[4]) ** (1/5) - 1) * 100, 2)}
        except Exception as e:
            dataByState[key] = None

    dataByIndustry = {}
    for key in industryKeys:
        try:
            saleData = fetch_raw_json(f"Sales Data for {key}", AusIndustryUrl("INCSALGDSSERV", industry = industryKeys[key], region = 'AUS'))["data"]["dataSets"][0]["series"]["0:0:0:0:0"]["observations"]
            cogsData = fetch_raw_json(f"Purchases Data for {key}", AusIndustryUrl("PURCHASES", industry = industryKeys[key], region = 'AUS'))["data"]["dataSets"][0]["series"]["0:0:0:0:0"]["observations"]
            sale = [float(v[0]) for v in saleData.values()]
            saleCAGR = round(((sale[0] / sale[4]) ** (1/5) - 1) * 100, 2)

            cogs = [float(v[0]) for v in cogsData.values()]
            stockLevel =  [cogs[i]  / sale[i] * 100 for i in range(len(sale))]
            avgStockLevel = round(sum(stockLevel)/len(stockLevel),2)
            dataByIndustry[key] = {
            "Sales": sale,
            "CAGR": saleCAGR,
            "Purchases": cogs,
            "stockLevel": avgStockLevel,
        }
        except Exception as e:
            dataByIndustry[key] = None

    marketData = {
        "CPI": cpiAvg,
    "WPI": wpiAvg,
    "growthByState": [{r : dataByState[r]["CAGR"]} for r in regionKeys],
    "growthByIndustry": [{i : dataByIndustry[i]["CAGR"]} for i in industryKeys], 
    "stockLevelByIndustry": [{i : dataByIndustry[i]["stockLevel"]} for i in industryKeys],
    "rentalYieldByCapital": rentalYields,
    },

    s3 = boto3.client('s3')
    s3.put_object(
        Bucket='busy-analytics-server',  # replace with your bucket name
        Key='data/marketData.json',  # or any path inside the bucket
        Body=json.dumps(marketData, indent=2),
        ContentType='application/json'
    )

    return {
        'statusCode': 200,
        'body': json.dumps("Data updated successfully")
    }