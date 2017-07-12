PRT 'Initial A = 10\nInitial B = 20\n\n'

CAL :set_a_and_b
ADD A, B
PRT 'ADD\t'
CAL :print_a_and_b

CAL :set_a_and_b
ADDS A, B
PRT 'ADDS\t'
CAL :print_a_and_b

CAL :set_a_and_b
SUB A, B
PRT 'SUB\t'
CAL :print_a_and_b

CAL :set_a_and_b
SUBS A, B
PRT 'SUBS\t'
CAL :print_a_and_b

CAL :set_a_and_b
MUL A, B
PRT 'MUL\t'
CAL :print_a_and_b

CAL :set_a_and_b
MULS A, B
PRT 'MULS\t'
CAL :print_a_and_b

CAL :set_a_and_b
DIV A, B
PRT 'DIV\t'
CAL :print_a_and_b

CAL :set_a_and_b
DIVS A, B
PRT 'DIVS\t'
CAL :print_a_and_b

HLT

:set_a_and_b
  LDV A, 10
  LDV B, 20
  RET

:print_a_and_b
  PRT 'A='
  OUT 0, A
  PRT '\tB='
  OUT 0, B
  PRT '\n'
  RET