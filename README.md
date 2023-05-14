# bosch
The main goal of this test project is to display the temperature and the pressure from the Bosch sensor 0261230340 / 0261230482 / DSM1TF / PST-F 1

This code work with pixljs (Espruino)

# Temperature sensor
> The sensor temperature value is not a proportional value

I use a voltage divider to get a value between 0.13v & 3.17v

Wiring
```
GND o---| R2/Bosch sensor |---(A0)---| R1 |---o 3.3V
```

With:
- R1 = 1800 Ohms
- R2/Bosch sensor between 71.9 Ohms (140°C) <-> 44864 Ohms (-40°C)

How it works ?
- I use a reference table 
- If the value is known in the table, I return the matched value
- If the value is between 2 values in the table, I return an estimated value thanks to a linear function

# Pressure sensor
> The sensor pressure value is a proportional value

I use a voltage divider to get a value between 0.37v & 3.3v

Wiring
```
GND o---| R2 |---(A1)---| R1 |---o Bosch sensor
```

With:
- R1 = 1200 Ohms
- R2 = 3300 Ohms

How it works ?
- I use a linear function to return an estimated value of the pressure

Bosch specification:
- V1 = Output voltage
- V2 = Output voltage from voltage divider (4.5v -> 3.3v)
 
 | PSI |  V1  |  V2  |  ADC  |
 |-----|------|------|-------| 
 |   0 | 0.50 | 0.37 | 0.111 |
 | 145 | 4.50 | 3.30 | 1.000 |

# About linear functions
## Linear function (Line cut the origin)
`y = ax`

```
    |
    |   **
    | **
----**-------------->
  **|
**  |
```

With:
| Var | Val |
|-----|-----|
|  Ya |   0 |
|  Yb |   2 |
|  Xa |   0 |
|  Xb |   5 |

How calculate the slope? `a = (Yb - Ya) / (Xb - Xa)`

- (2-0) / (5-0) -> 2 / 5 -> 0.4

Example of results:
| X |   Y |
|---|-----|
| 0 | 0.0 |
| 1 | 0.4 |
| 2 | 0.8 |
| 3 | 1.2 |
| 4 | 1.6 |
| 5 | 2.0 |
| 6 | 2.4 |

## Linear function (Line doesn't cut the origin)
`y = ax + b`

```
    |
    |   **
    | **
    **
  **|
**--|--------------->
    |
```

With:
| Var | Val |
|-----|-----|
|  Ya |   2 |
|  Yb |   4 |
|  Xa |   0 |
|  Xb |   5 |

How calculate the slope? `a = (Yb - Ya) / (Xb - Xa)`
- (4-2) / (5-0) -> 2 / 5 -> 0.4

How found `b` value ?
- b = Y - ax (Replace value by Ya & Xa)
- b = Ya - a * Xa
- b = 2 - 0.4 * 0
- b = 2

Example of results:
| X |   Y |
|---|-----|
| 0 | 2.0 |
| 1 | 2.4 |
| 2 | 2.8 |
| 3 | 3.2 |
| 4 | 3.6 |
| 5 | 4.0 |
| 6 | 4.4 |

### Bosch pressure sensor linear function
- X (psi)
- Y (Volt)

With:
| Var | Val |
|-----|-----|
|  Ya | 0.5 | 
|  Yb | 4.5 |
|  Xa | 0.0 |
|  Xb | 145 |

How calculate the slope? `a = (Yb - Ya) / (Xb - Xa)`
- (4.5-0.5) / (145-0) -> 4 / 145 -> 0.0275862068965517

How found `b` value ?
- b = Y - ax (Replace value by Ya & Xa)
- b = Ya - a * Xa
- b = 0.5 - 0.0275862068965517 x 0
- b = 0.5

`Y = 0.0275862068965517 * X + 0.5`
