# userstatsapp

##### [Link To App](https://desolate-scrubland-24450.herokuapp.com/#!/)

### What Is This?

This app was written as a project exercise during a job interview. It is meant to process data retrieved from [Random User Generator](https://randomuser.me/api/?results=10). 

The data generated from Random User Generator is parsed and displayed in 5 different graphs. The graphs and how the data points are calculated are listed below:

##### Percentage Female Versus Male
To calculate the female percent we keep track of how many people have gender === "female" on every iteration of a person in the dataset. We then divide this number by the total population to get the % who are female. We subtract this number from 100 to get the number of males in the dataset.

##### Percentage of First Names That Start With A-M Versus N-Z
To calculate this percentage, we use regex to check that a persons first name starts wiht A-M on every iteration of a person in the data set. If it does, we increase a counter. Once done iterating, we divide by the total population to gt the % whose first name start with A-M. This number is subtracted from 100 to get those first names starting with N-Z.

##### Percentage of Last Names That Start With A-M Versus N-Z
Exact same methodology as above, only with last names.

##### Percentage of People In Each State, Percentage of Females In Each State and Percentage of Males In Each State, Up To The Top 10 Most Populous States
In order to calculate these data points we first maintain an associative array whose "key" is the state name of each person in the dataset. On every iteration we check to see if there is a corresponding entry in the array. If there isn't, we make one, defaulting the count of females and state-level population to 0 as these are the values we care about. We then pull the state object out of the array and increase the number of females if the person is a female as well as the total population for that state. When we are done iterating through the dataset, we sort the array in descneding population and pull of the top ten state objects, which are our top ten population counts. Using the data within these state objects, we calculate the percent of females by taking that states female count and dividing it by that states population. We subtract this number from 100 to arrive at the male population percent for that state. We calculate the percentage of the total population this state counts for by dividing that states population by the total population. We display all 3 of these data points in a bar chart since they are all state level statistics.

##### Percentage of People in the Following Age Ranges: 0-20, 21-40, 41-60, 61-80, 81-100, 100+
While iterating through the data set, we take a persons date of birth and calculate their age. Depending on what range they fall into, we increase the count for that range. Once done iterating we divide each set by the total population to get the percentage that age group counts for.
