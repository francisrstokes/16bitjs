# Load A (0) into memory location 0xFE
LDM A, 0xFE

# Load 1 into B
LDV B, 1

# Load the number of iterations into C
LDV C, 20

# Store this number at memory location 0xFD
LDM C, 0xFD

# Calculate squares "function"
:calculate_squares
ADD A, B
MOV D, A
MUL D, D
PSH D
OUT D
JLT A, C, :calculate_squares

HLT