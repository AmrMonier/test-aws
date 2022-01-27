const resetPasswordTemplate = (token, name) => {
  return `<body style="height: 100% !important; margin: 0; padding: 0; width: 100% !important;">


  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">

          <tr>
            <td bgcolor="#00265e" align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td bgcolor="#00265e" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td bgcolor="#f1f1f1" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #00265EFF; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                    <img src="https://us-wbe-img.gr-cdn.com/user/36d58986-ca3b-4e4f-8046-cb7e9b1ed8ee/248dd74c-1795-432f-aad5-7940e345c4de.png" width="170" style="display: block; border: 0px; margin-bottom: 25px;" />
                      <h1 style="font-size: 36px; font-weight: 900; margin: 2; margin-bottom: 0px">Forgot your<br /> password?</h1> 
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td bgcolor="#fff" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                <tr>
                  <td bgcolor="#f1f1f1" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                    <p style="margin: 0;">Use the link below to set up a new password for your account. If you did not request to reset your password, ignore this email and the link will expire on its own.</p>
                  </td>
                </tr>

                <tr>
                  <td bgcolor="#fff" align="left">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td bgcolor="#f1f1f1" align="center" style="padding: 20px 30px 40px 30px;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="center" style="border-radius: 3px; margin-bottom: 25px;" bgcolor="#b60002">
                              <a href="${process.env.CLIENT_LINK}/reset-password/${token}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 5px; border: 1px solid #b60002; display: inline-block;">Set new password</a></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
      </table>

    </body>`  
};
const resetConfirmationTemplate = (name) => {
  return `<body style="height: 100% !important; margin: 0; padding: 0; width: 100% !important;">


  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> 
  Hello, <strong>${name}</strong>, We're thrilled to have you here! Get ready to dive into your new account. 
</div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">

          <tr>
            <td bgcolor="#00265e" align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td bgcolor="#00265e" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td bgcolor="#f1f1f1" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #00265EFF; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                    <img src="https://us-wbe-img.gr-cdn.com/user/36d58986-ca3b-4e4f-8046-cb7e9b1ed8ee/248dd74c-1795-432f-aad5-7940e345c4de.png" width="170" style="display: block; border: 0px; margin-bottom: 25px;" />
                      <h1 style="font-size: 36px; font-weight: 900; margin: 2; margin-bottom: 0px">Password Changed Successfully!</h1> 
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td bgcolor="#fff" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                <tr>
                  <td bgcolor="#f1f1f1" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                    <p style="margin: 0; text-align: center;">Your password has been changed successfully.</p>
                    <p style="margin: 0; text-align: center;">Use your new password to log in.</p>
                  </td>
                </tr>

                <tr>
                  <td bgcolor="#fff" align="left">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td bgcolor="#f1f1f1" align="center" style="padding: 20px 30px 40px 30px;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="center" style="border-radius: 3px; margin-bottom: 25px;" bgcolor="#b60002"><a href="#" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 5px; border: 1px solid #b60002; display: inline-block;">Login now</a></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
      </table>

    </body>`;
};
const verifyEmailTemplate = (name, token) => {
  return `<body style="height: 100% !important; margin: 0; padding: 0; width: 100% !important; font-family: Helvetica, sans-serif;">


  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">Hello, <strong>${name}</strong>, We're thrilled to have you here! Get ready to dive into your new account. </div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">

          <tr>
            <td bgcolor="#00265e" align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td bgcolor="#00265e" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td bgcolor="#f1f1f1" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #00265EFF; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                      <h1 style="font-size: 48px; font-weight: 900; margin: 2; margin-bottom: 25px">Welcome!</h1> 
                      <img src="https://us-wbe-img.gr-cdn.com/user/36d58986-ca3b-4e4f-8046-cb7e9b1ed8ee/248dd74c-1795-432f-aad5-7940e345c4de.png" width="170" style="display: block; border: 0px;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td bgcolor="#fff" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                <tr>
                  <td bgcolor="#f1f1f1" align="left" style="padding: 20px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                    <h3 style="color: #00265EFF; font-size: 20px; font-weight: 900; text-align: center;">Verify Your Account</h3>
                  </td>
                </tr>

                <tr>
                  <td bgcolor="#f1f1f1" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                    <p style="margin: 0;">Thank you for signing up for Marketeers. We're really happy to have you! <br />Click the link below to login to your account:</p>
                  </td>
                </tr>

                <tr>
                  <td bgcolor="#fff" align="left">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td bgcolor="#f1f1f1" align="center" style="padding: 20px 30px 40px 30px;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="center" style="border-radius: 3px;" bgcolor="#b60002"><a href="${process.env.CLIENT_LINK}/verify/${token}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 5px; border: 1px solid #b60002; display: inline-block;">Confirm Account</a></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td bgcolor="#f1f1f1" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                      <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                  </td>
                </tr>

                <tr>
                  <td bgcolor="#f1f1f1" align="left" style="padding: 10px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                    <p style="margin: 0;"><a href="${process.env.CLIENT_LINK}/verify/${token}" target="_blank" style="color: #b60002;">${process.env.CLIENT_LINK}/verify/${token}</a></p>
                  </td>
                </tr>

                <tr>
                  <td bgcolor="#f1f1f1" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 25px;">
                    <p style="margin: 0;">Cheers,<br>Marketeers Team</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
      </table>

    </body>`;
}
const sendOtpTemplate = (name, otp) => {
  return `<body style="height: 100% !important; margin: 0; padding: 0; width: 100% !important; font-family: Helvetica, sans-serif;">


  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">Hello, <strong>${name}</strong>, We're thrilled to have you here! Get ready to dive into your new account. </div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">

          <tr>
            <td bgcolor="#00265e" align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td bgcolor="#00265e" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td bgcolor="#f1f1f1" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #00265EFF; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                      <h1 style="font-size: 48px; font-weight: 900; margin: 2; margin-bottom: 25px">Welcome!</h1> 
                      <img src="https://us-wbe-img.gr-cdn.com/user/36d58986-ca3b-4e4f-8046-cb7e9b1ed8ee/248dd74c-1795-432f-aad5-7940e345c4de.png" width="170" style="display: block; border: 0px;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td bgcolor="#fff" align="center" style="padding: 0px 10px 0px 10px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                <tr>
                  <td bgcolor="#f1f1f1" align="left" style="padding: 20px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                    <h3 style="color: #00265EFF; font-size: 20px; font-weight: 900; text-align: center;">Verify Your Account</h3>
                  </td>
                </tr>

                <tr>
                  <td bgcolor="#f1f1f1" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                    <p style="margin: 0;">Hello, ${name} here is your OTP you request incase you haven't requested one please just ignore this email</p>
                  </td>
                </tr>

                <tr>
                  <td bgcolor="#fff" align="left">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td bgcolor="#f1f1f1" align="center" style="padding: 20px 30px 40px 30px;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="center" style="border-radius: 3px;" bgcolor="#b60002"><span style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 5px; border: 1px solid #b60002; display: inline-block;">${otp}</span></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td bgcolor="#f1f1f1" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 25px;">
                    <p style="margin: 0;">Cheers,<br>Marketeers Team</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
      </table>

    </body>`;
}
export { resetPasswordTemplate, resetConfirmationTemplate, verifyEmailTemplate, sendOtpTemplate };
