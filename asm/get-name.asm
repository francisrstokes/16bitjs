.data
  .name size 6
  .name_max 5
  .name_pointer 0
  .hello string 'Hello, '
  .nl string '\n'

.text
  .global main:

get_name:
  ldv a, 1              ; load a with the the stdin call code
  sys                   ; get a character of stdin, place into b
  
  ldv d, get_name:
  ldv a, 0
  jeq b, d              ; if the character was 0 then no key has been pressed since the last check, just loop

  ldv a, .name          ; get the start address of name
  ldv c, .name_pointer  ; get the address of the name pointer
  lda d, c              ; get the value of the name pointer into c
  add a, c              ; add a+c, placing the result in a. a now points to the next address
  ldp a, b              ; load the value in b into the address pointed at by a

  ldv a, .name_pointer  ; get the address of the name pointer
  lda a, b              ; place the value of the name pointer into b
  inc b                 ; add one to b
  ldv c, .name_max      ; place address of name_max into c
  lda a, c              ; place the value of name_max into a

  ldv c, get_name_done: ; place the address of get_name_done into c
  jeq b, c              ; if b (name_pointer+1) is equal to the name max, jump to get_name_done

  ldv a, .name_pointer  ; put the address of name pointer into a
  ldp a, b              ; add the new value of the name pointer into memory
  ldv a, 0
  ldv c, get_name:
  jmr c                 ; get the next character

  get_name_done:
    ldv a, .name          ; get the start address of name
    ldv b, .name_pointer  ; get the address of the name pointer
    lda c, b              ; get the value of the name pointer into c
    add a, c              ; add a+c, placing the result in a. a now points to the next address
    ldv b, 0
    ldp a, b              ; place a 0 on the end of the string, and we have the whole name in memory

    ret                   ; return from the function

main:
  ldv a, get_name:
  cal a

  ldv a, .stdout
  ldv b, .name_pointer
  ldv c, 4
  sys                     ; print the name

  ldv b, .nl
  sys                     ; print a newline

  hlt