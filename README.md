Created by Ronny Nguyen, 2025

Here is the description of this project.
Senario: there are many business listing on the web, but they are not standardized in format of posting, it depend on the agent that represent it or many information is withhold. So I develop a formula, mostly DCF model with some simulator factor that make up for hidden information such as SAV, owner salary, growth rate, local rent growth. I have finalised the formula in excel file.
Now I want to launch a website that does these things:

- Has a database to store the data (different business information that I collected), can be easily updated by admin, which is me (add more business as I go). Database may need to store images
- Interactive user interface, where users can tweak the number factors to suit there liking
- The home page is the lists of all business from the database. After 1 is chosen, it is taken to its own address, where all the info is lay out and the formula will calculated and show the final verdict
- Some factor I want it to be real time, such as interest rate, CPI, Wage Index, so API can be incorporate if needed.
- Metrics that can not be APIed, will be update by hand, usually come in excel file, I use python to process these raw data. Think of a way to automatically process and update it to the database.
