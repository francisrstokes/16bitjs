LDV A, 0
LDV B, 1
LDV C, 10

:label1
ADD A, B
MOV D, A
MUL D, D 
OUT D
  
JLT A, C, :label1
HLT