# RapidBill-Fusion
# Smart Billing System with WhatsApp Integration

## Overview
This project is a **Smart Billing System** designed to streamline the billing process using **ESP32 Cam**, **Raspberry Pi**, and **Firebase**. The system performs real-time object detection to identify items, fetches price and weight information from a database, and generates a digital bill. The bill is then sent to the customer's **WhatsApp** using the **WhatsApp API** for seamless integration.

## Features
- **ESP32 Cam Integration**: Captures real-time image feeds for object detection.
- **Edge-based Object Detection**: Raspberry Pi processes images using pre-trained ML models.
- **Database Integration**: Fetches price and weight details from Firebase in real-time.
- **HTTP Protocol**: Transfers object detection results to the User Interface (UI).
- **Interactive User Interface (UI)**: Displays detected object details with an option to generate a bill.
- **WhatsApp API Integration**: Sends generated bills directly to the customer's WhatsApp.
- **Thank You Message**: Displays a personalized "Thanks for Shopping!" message after the process.

## Workflow
1. **Image Feed**: ESP32 Cam captures real-time image feeds and sends them to the Raspberry Pi.
2. **Object Detection**: Raspberry Pi runs ML models to identify objects.
3. **Firebase Query**: Raspberry Pi fetches price and weight details for the detected objects.
4. **HTTP Transfer**: Detected details (object name, price, and weight) are sent to the UI.
5. **Bill Generation**: Upon request, the UI triggers a bill generation process.
6. **WhatsApp Delivery**: The generated bill is sent to the customer's WhatsApp number.
7. **Thank You Message**: Displays a "Thanks for Shopping!" message after the process.

## Technologies Used
- **ESP32 Cam**: For capturing real-time images.
- **Raspberry Pi**: For running ML models and handling data processing.
- **Firebase**: For storing and fetching price and weight information.
- **Edge Impulse**: For deploying ML models.
- **HTTP Protocol**: For transferring data to the UI.



## Project Structure
