import sys, re
import json
import phonenumbers
from phonenumbers import NumberParseException, PhoneNumberFormat, region_code_for_number

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


keyword = sys.argv[1] #Plug the keyword bellow.
countryCode = sys.argv[2] #country code like UK, USA, BD

def removeNonDigits(phone):
    return re.sub(r'\D', '', phone)

def validateWithCountryCode(number, country_code):
    try:
        parsed_number = phonenumbers.parse(number, country_code)
        if phonenumbers.is_valid_number(parsed_number):
            region = region_code_for_number(parsed_number)
            
            if region == country_code.upper():
                formatted_number = phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.E164).replace('+', '')
                return formatted_number
        return 0
    except NumberParseException:
        return 0
#print(validateWithCountryCode("+1 416-555-0198", countryCode))


'''
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run Chrome in headless mode
chrome_options.add_argument("--no-sandbox")  # Disable the sandbox if you're running on a restricted environment (e.g., Docker)
chrome_options.add_argument("--disable-dev-shm-usage")  # To avoid issues with limited shared memory
chrome_options.add_argument("--disable-gpu")  # Disable GPU hardware acceleration



driver = webdriver.Chrome(chrome_options)
driver.get(f'https://www.google.com/maps/search/{keyword}')
print("Scrapping numbers for the keyword: "+keyword)
wait = WebDriverWait(driver, timeout=10)
def scroll_within_element(element):
    driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", element)  # Scroll to the bottom
    time.sleep(1)

container = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[role="feed"]')))
last_scroll_height = driver.execute_script("return arguments[0].scrollHeight", container)
end_of_list_element = (By.CLASS_NAME, "HlvSq")  #<span class="HlvSq">আপনি তালিকার শেষে পৌঁছে গেছেন।</span> 
while True:
    scroll_within_element(container)  # Scroll to the bottom of the container
    try:
        wait.until(EC.visibility_of_element_located(end_of_list_element))
        print("Reached the end of the list.")
        break
    except:
        pass
    new_scroll_height = driver.execute_script("return arguments[0].scrollHeight", container)
    last_scroll_height = new_scroll_height
elements = driver.find_elements(By.CLASS_NAME, "UsdlK")

numbersArray = []
for element in elements:
    validNumber = validateWithCountryCode(removeNonDigits(element.text), countryCode)
    if(validNumber and validNumber not in numbersArray):
        numbersArray.append(validNumber)
    
print(json.dumps(numbersArray))

'''

#this is extra lines of code to test.
exampleNumsArray = [
    "01336830068 ",
    "+8801765-232-378",   # United States
    "919876543210",   # India
    "1 416-555-0198",   # Canada
    "44 7911 123456",   # United Kingdom
    "61 412 345 678",   # Australia
    "49 170 1234567",   # Germany
    "+33 6 12 34 56 78", # France
    "+55 21 91234-5678", # Brazil
    "+81 90-1234-5678",  # Japan
    "+86 139 1234 5678", # China
    "1012345678",  # South Korea
    "525512345678",  # Mexico
    "+39 345 6789012",   # Italy
    "+34 612 345 678",   # Spain
    "+7 905 123-45-67",  # Russia
    "+27 82 123 4567",   # South Africa
    "+64 21 234 5678",   # New Zealand
    "+54 9 11 2345-6789",# Argentina
    "+20 101 2345678"    # Egypt
]
numbersArray = []
for number in exampleNumsArray:
    validNumber = validateWithCountryCode(removeNonDigits(number), countryCode)
    if(validNumber and validNumber not in numbersArray):
        numbersArray.append(validNumber)
    
print(json.dumps(numbersArray))