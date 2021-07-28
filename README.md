# Shop App
</br>
<p align="center">
  <img width="300" height="600" style = "border-radius: 30px; margin-right: 20px" src="https://i.ibb.co/yfRjyNS/Screenshot-20210728-181451-Shopping-1.jpg">
  <img width="300" height="600" style = "border-radius: 30px;" src="https://i.ibb.co/7r0g8MZ/Screenshot-20210728-181502-Shopping-1.jpg">
</p>
</br>

## Description
This project is a simplified implementation of a shopping system, the project aims to provide the basic features that are expected to be found in a mobile e-commerce applicaion where users can purchase and sell products. To navigate through the app, users have to authenticate themselves. Once logged-in, users can scroll through the list of available products, add different products to the cart, and make orders. Users can also add, edit, remove their own products into the main store. 

## Authentication and Security
The app contains a simple authentication system implemented using [Firebase Auth REST API](https://firebase.google.com/docs/reference/rest/auth) for the backend. If the authentication process is successful, a unique token is sent from the backend to the user in concern, the token is then stored locally in the device and will expire exactly after 1h of its receival. When expired, the token is deleted from the device and the user will be automatically signed out and prompt to the login screen. Otherwise, if something went wrong with authentication process, the proper error message will be displayed in the screen.

To ensure the right credentials are to be provided whenever the user enters some data, all forms in this project contain some basic validation algorithms that are reused whenever validation is required.

## Databases
Most data in this project (products, orders, users) is stored in [Firebase Realtime Database](https://firebase.google.com/docs/database). Some other user-specific data (auth-token, favorite products) is stored locally in the device using [AsyncStorage](https://github.com/react-native-async-storage/async-storage).

## Navigation
All navigation in this project is built with [React Navigation v5](https://reactnavigation.org/docs/getting-started/).

## Animations
The app contains different types of animations on different screens to provide a smooth user experience, all animations are implemented using the [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) library, which means the vast majority of calculations required to animate different style properties are all done in the UI Thread in the native side, so the bridge between native and react native is very infrequently crossed, therefore, animtions are never interrupted even if the JS Thread is heavily busy, resulting in smooth animations that would run at 60fps even in low-end devices.

## Designs
All design assets used in this app (screens, components, input fields, icons...) are made by the owner of this project.


## Usage
To run the project locally run the following commands in order:

Clone the project locally

    $ git clone https://github.com/abdoutech19/shop-app.git

Navigate to project root directory

    $ cd shop-app


Install all dependencies

    $ yarn install || npm install

Run the project in debug mode

    $ npx react-native run-android

Or run the project in release mode for a smoother experience

    $ npx react-native run-android --variant=release

***NOTE:** this project uses the [Hermes](https://reactnative.dev/docs/hermes) JavaScript engine to improve start-up time, decrease memory usage, and reduce app size. For these improvments to take effect, the app has to be running in *release* mode, otherwise, Hermes won't have any effect on improving performance in *debug* mode, in fact, some developeres have noticed slower results with the Hermes engine enabled in *debug* mode.*

## Demo
To test the app in your android device, you can download the **.apk** file from here: [shopping](https://drive.google.com/file/d/1QzceGiaLU72TZSFnQF_250pXH2KnCQHX/view?usp=sharing).

## Video Demo

### Authentication and validation

https://user-images.githubusercontent.com/44240293/127367181-ba188c22-997d-4280-8cff-b7867ebf324c.mp4

### Shopping
https://user-images.githubusercontent.com/44240293/127366818-a3f6316b-e770-4a8e-8cd0-59c08df8361d.mp4


## License
Distributed under the MIT License. See LICENSE for more information.

## Contact
Email me at: abdou19.tech@gmail.com.