# Raspberry Pi - LCD API

Express API for controlling an LCD connected to a Raspberry Pi

## Swagger Docs

Available at `http:/[IP_ADDRESS]:3000/docs`

## Setup

Heavily dependant on [this](https://tutorials-raspberrypi.com/control-a-raspberry-pi-hd44780-lcd-display-via-i2c/) tutorial for the hardware setup.

### Pins

| Raspberry Pi        | 3.3V Level Converter | 5V Level Converter | I2C LCD Adapter |
| ------------------- | -------------------- | ------------------ | --------------- |
| 3.3V (Pin 1)        | LV                   | -                  | -               |
| 5V (Pin 2)          | -                    | HV                 | VCC             |
| GND (Pin 6)         | GND                  | GND                | GND             |
| GPIO2 / SDA (Pin 3) | TX1 (below)          | -                  | -               |
| GPIO3 / SCL (Pin 5) | TX1 (above)          | -                  | -               |
| -                   | -                    | TX0 (below)        | SDA             |
| -                   | -                    | TX0 (above)        | SCL             |

### Required Software

#### I2C Dependencies

`sudo apt install python-smbus i2c-tools`

#### API Dependencies

- NodeJS - [https://nodejs.org/en/](https://nodejs.org/en/)
- PM2 - [https://pm2.io/](https://pm2.io/) - `npm install -g pm2`

#### Pi Configuration

`sudo raspi-config` and enable I2C

#### Find the Address

`sudo i2cdetect -y 1`

### Schematic Drawing

![Schematic Drawing](https://raw.githubusercontent.com/aboyce/raspberry-pi-lcd-api/main/docs/hd44780-i2c.png 'Schematic Drawing')

_Credit: https://tutorials-raspberrypi.com_

## Running

#### `npm install`

#### `npm run build`

#### `npm run serve`
