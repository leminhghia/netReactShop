import { z } from "zod";

const passwordValidation = new RegExp(
   
/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
)

export const registerSchema = z.object({
    email:z.string().email(),
    password:z.string().regex(passwordValidation,{
        message:'Password must contain 1 lowercase , 1 uppercase,1 alpha, 1 number, 1 sepcial and be 6-10 charaters'
    })
})

export type RegisterSchema = z.infer<typeof registerSchema>