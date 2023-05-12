from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import time

# Replace <WEBPAGE_URL> with the URL of the webpage you want to fetch URLs from
webpage_url = "https://www.facebook.com/sahibbandgi.jammu/videos"

# Replace <DRIVER_PATH> with the path to your WebDriver executable
driver_path = "/usr/local/bin/chromedriver"

# Create a new Chrome webdriver instance
# Create a new Chrome webdriver service
service = Service(driver_path)

# Start the service
service.start()

# Create a new Chrome webdriver instance
driver = webdriver.Chrome(service=service)

# Navigate to the webpage
driver.get(webpage_url)

# Wait for the page to load

# Wait for the page to load
timeout = 10
try:
    element_present = EC.presence_of_element_located((By.TAG_NAME, 'body'))
    WebDriverWait(driver, timeout).until(element_present)
except TimeoutException:
    print("Timed out waiting for page to load")

# Get all the URLs on the page
urls = []
links = driver.find_elements(By.TAG_NAME, 'a')
for link in links:
    url = link.get_attribute('href')
    if url is not None and url not in urls:
        urls.append(url)

# Scroll to the bottom of the page to load more content
last_height = driver.execute_script("return document.body.scrollHeight")
while True:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

# Get all the URLs on the page after infinite scrolling
links = driver.find_elements(By.TAG_NAME, 'a')
for link in links:
    url = link.get_attribute('href')
    if url is not None and url not in urls:
        urls.append(url)

# Print all the URLs on the page
for url in urls:
    print(url)

# Quit the webdriver instance and stop the service
driver.quit()
service.stop()