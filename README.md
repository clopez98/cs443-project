# Compiling & Running Code

## Requirements
NodeJS & NPM 

These can be downloaded following [this guide](https://www.guru99.com/download-install-node-js.html)

Expo

This can be downloaded following [this guide](https://docs.expo.dev/get-started/installation/)
## Compiling & Running

To compile and run our code, you must clone the repository. Change directories to the repository repo, and run the command:

```bash
expo start
```

When it is done, you should see this screen: 
![Image](https://i.gyazo.com/a4db281020fd3a3f71e7fb94d9784221.png)

From here, you have two options. You can either run the application on an Android emulator, or run it on an actual Android device.

### Emulator
To run on an android emulator, after you have followed the above steps, open the repo in Android Studio. From there, head to tools --> AVD Manager, and start your Android emulator. When your Android Emulator is running, return to your command prompt, and press the 'a' key to begin loading the app onto the emulator. When it's done running, you should see this: 

![Image](https://i.gyazo.com/3ef7cb3453db20b135d64fd35c02629d.png)

If the app does not immediately load onto the emulator after reaching this screen, you can press the R key to reload the app. After this, you should see the App building, and then it will load on your screen.

### Actual Device
To run on an actual device, you simply need to download the Expo Go app from the Google Play Store, and then scan the QR code that is generated upon running the expo start command. The app should then automatically load onto your device.
