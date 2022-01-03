# Github API Visualisation 

This project is the final project of the CSU33012 module Software Engineering. It is the visualisation of data parsed in from a specified user using Github API. 

To run the application. 
  - Run the command `npm install` first
  - Start the server by running `npm start`
  - Open your chosen browser and navigate to `http://localhost:8080`

## Application Process

You first login by pressing the login button 

### Login
![firstLogin](https://user-images.githubusercontent.com/61195644/147970528-2e762009-8d66-46bf-8729-7343aec95549.PNG)

By pressing this button it will then direct you to authenticate your account so to use the application and search for other users

### Authentication
![loginAuth](https://user-images.githubusercontent.com/61195644/147970627-9da7cb78-8b1e-4a95-9c18-3248a78bf87a.PNG)

By authenticating your account you are then redirected to the main page where you can search for repository commit stats specific to their user

### Graph stats visualisation 
![Visualisation with Data](https://user-images.githubusercontent.com/61195644/147970720-18dadd81-5ad3-404f-890a-abb40cbea166.PNG)

Note: I currently have it set to always return to the stats of this repo, however this can be changed in the home.html code to just open a home page of blank stats

### Plain Home Page Visualisation
![PlainVis](https://user-images.githubusercontent.com/61195644/147970854-e4febf97-0506-412b-9c06-cb5e08f2e941.PNG)

## The Graphs
The two graphs visualised display stats for the searched users specified repository. It will display the hours when the commits were made and which week of the year the commits were made.
These visualisations allow the user to interpret when the developer was most active. 

## Roadblocks 

From previous projects I wanted to work again with an authorisation API call. However I struggled trying to figure out how to integrate that to redirect back to the main page. Thankfully researching further into the documentation of the Github API and its possible calls helped a lot. 
Also learning how to visualise the graph and the many options within javascript libraries was a challenge but progressing from the lecture videos and using the d3.js library was helpful here.
