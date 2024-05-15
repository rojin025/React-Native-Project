# CS571 Workshop 04
## MIU Courses Review App
Start by creating a new expo project, copy the provided components, and then start working on the requirements, you will need to add additional dependencies based on the requirements. **Check the screenshots below**.  
* To start, install and update all dependencies.
* Complete the code in `App.tsx` to render an application with the following structure:
  * Bottom Tab Navigator
    * Stack Navigator
      * CoursesList screen
      * CourseDetails screen
      * AddReview screen
    * About screen
* Complete the code in `components/Header.ios` or `components/Header.android` to show the header of this application
* Complete the code in `/components/CoursesList.tsx` to display the Live Search and list of courses using `FlatList`. The `Course` reusable component renders a single course, you will need to implement `infoPressed` method and make it functional.
* Complete the code in `/components/CourseDetails.tsx` to display the course details, you will also need to implement `addReview` method.
* Complete the code in `/components/AddReview.tsx` to meet the following requirements:
  * Create a controlled form with the following state: `{ name: '', rating: 0, comment: ''}`.
  * After the first submit, the form will persist the review details in the phone storage using `AsyncStorage`. The next time a user opens the screen, the review details will be fetched from the phone storage. 
  * When users click `Submit Review` display an `ActivityIndicator`, save their review details in the phone storage, and navigate back to the course details screen.

## ActivityIndicator: https://reactnative.dev/docs/activityindicator
## Please refer to icons at: https://docs.expo.dev/guides/icons/
* Install: npm i @expo/vector-icons
* Find icon names: https://icons.expo.fyi/Index
## Please find screenshots for the finished application:  

<img src="./screenshots/homepage.png" width="35%" /><img src="./screenshots/live-search.png" width="35%" />  
  
<img src="./screenshots/course-details.png" width="35%" /><img src="./screenshots/about.png" width="35%" />  
  
<img src="./screenshots/Simulator Screen Shot - iPhone 11 - 2020-04-30 at 13.08.50.png" width="35%" /><img src="./screenshots/add-review.png" width="35%" />


