# Installation:
This project requires the backend and frontend servers running in 2 separate terminal windows.

In the IntelliJ welcome window:
```
Import -> Import project from external model -> Choose "Gradle"
```
or start the server from the terminal:
```
./gradlew clean run
```

In another terminal window, navigate to `/frontend`, then do:
```
npm i && npm start
```

Open `localhost:3000` in the browser. 

---

# Features:
- Create, update, and delete a service.
- Viewing the list of services. The frontend polls an endpoint once every minute and automatically updates the list.
If it encounters an error, it stops polling. Assistive technologies get notified of the time of the last update.
- Custom CSS
- Accessible and responsive UI.

---

# Technologies/Libraries used:
- [Create React App](https://github.com/facebook/create-react-app) with:
    - [Typescript](https://github.com/Microsoft/TypeScript) 
    - [CSS Modules](https://github.com/css-modules/css-modules)
- [React Router](https://github.com/ReactTraining/react-router)
- [React Feather](https://github.com/feathericons/react-feather)

