module.exports = (label) => `

ldv16 A, .offset
ldr B, A
ldv16 A, .memory
add A, B            ; A = memory + offset
ldr B, A            ; B = value at [memory + offset]
mov A, B            ; A = value at [memory + offset]
ldv B, 1            ; Set B to comparison value of 1
ldv C, ${label}
jge A, B, C     ; A(Memory value) >= B(1), then jump

`;