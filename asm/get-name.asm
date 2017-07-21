.data
  .name size 6
  .name_max 4
  .name_pointer 0
  .question string 'What is your name? (5 letters)\n'
  .hello string 'Hello, '
  .nl string '\n'

.text
  .global main:

get_name:
  ;;;;;;;;;;;; Get input ;;;;;;;;;;;;;;
  ldv a, 1              ; load a with the the stdin call code
  sys                   ; get a character of stdin, place into b

  ;;;;;;;;;; Input is 0? ;;;;;;;;;;;;;;
  ldv d, get_name:
  mov a, b
  ldv b, 1
  jlt b, d              ; if a < 1, loop

  ;;;;; Place character into memory ;;;;
  ldv b, .name          ; get the start address of name
  ldv c, .name_pointer  ; get the address of the name pointer
  ldr d, c              ; get the value of the name pointer into d
  add b, d              ; add a+c, placing the result in a. a now points to the next address
  ldp b, a              ; load the value in b into the address pointed at by a

  ;;; Increase character pointer ;;;;;;;
  ldv a, .name_pointer  ; get the address of the name pointer
  ldr b, a              ; place the value of the name pointer into b
  inc b                 ; add one to b
  ldp a, b              ; save the name_pointer in memory

  ;;;;;;; Get value of name_max ;;;;;;;;
  ldv c, .name_max      ; place address of name_max into c
  ldr a, c              ; place the value of name_max into a

  ;;;;; Got all the characters? ;;;;;;;;
  ldv c, final_zero:
  jlt b, c              ; if (a < b) = (name_max < name_pointer), we are done
  ldv c, get_name:      ; otherwise jump back to the beginning to get the next character
  jmr c

  ;;;;;; Add the final zero ;;;;;;;;;;;;
  final_zero:
  ldv a, .name          ; get the start address of name
  ldv b, .name_pointer  ; get the address of the name pointer
  ldr c, b              ; get the value of the name pointer into c
  add a, c              ; add a+c, placing the result in a. a now points to the next address
  ldv b, 0
  ldp a, b              ; place a 0 on the end of the string, and we have the whole name in memory
  ret                   ; return from the function

main:
  ldv a, 0
  ldv c, 4
  ldv b, .question
  sys

  ldv a, get_name:
  cal a

  ldv a, 0
  ldv c, 4

  ldv b, .hello
  sys

  ldv b, .name
  sys                     ; print the name

  ldv b, .nl
  sys                     ; print a newline

  hlt