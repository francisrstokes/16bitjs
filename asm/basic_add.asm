# Load the value 0xA0A0 into A register
LDV A, 0x55

# Load the value 0x0A0A into B register
LDV B, 0xAA

# Add the values in A and B together and store the result in A
ADD A, B

# Print the value in register A
OUT A

# Halt the program
HLT