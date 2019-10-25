import pandas as pd
import datetime

#Reading File
data = pd.read_excel('RNGWHHDd.xls',sheet_name=1)


#Renaming Headers
data.columns = ['Date' , 'Price']

#Finding index of Date and using the next values as data
date_index = data[data[data.columns[0]] == 'Date'].index[0]
date_index = date_index + 1
data = data[date_index:]

#Reducing DateTime entries to date only
data['Date'] = data['Date'].dt.date
#Writing the file as a csv file

data.to_csv('Henry_Hub_Gas_Prices_Daily.csv',index=False)

#Now working on monthly prices

#Converting price values to float
data['Price'] = data['Price'].astype(float)
#Converting to datetime format
data['Date'] = pd.to_datetime(data['Date'])
#Grouping data and taking mean
data2 = data.groupby(data['Date'].dt.strftime('%Y/%m/01'))['Price'].mean()
#Write the data to a csv file
data2.reset_index().to_csv('Henry_Hub_Gas_Prices_Monthly.csv', header=True, index=False)
