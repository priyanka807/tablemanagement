
import * as Yup from 'yup';

import React from 'react'

export const loginSchemas =  Yup.object({
    // name:Yup.string().min(3).max(25)("please enter your name"),
    email:Yup.string().email('email is invalid').required("please enter   your  valid email"),
    password:Yup.string().min(3).required("please enter your  password"),
    // confirm_password:Yup.string().oneOf([Yup.ref('password'),null],"Password must match")

})
  
   