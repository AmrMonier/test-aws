import Admin from "./../Models/Admin.js";
import dbInstance from "./../middlewares/mongoose.js";
import chalk from "chalk";
console.log(
  chalk.bgGray(
    "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * "
  )
);
console.log(
  chalk.bgGray(
    "* * * * * * * * * * * Generrating super admin account * * * * * * * * * * * * "
  )
);
dbInstance
  .connect()
  .then(() => {
    Admin.findOne({ isSuperAdmin: true }, (err, account) => {
      if (account != null) {
        console.error(
          chalk.bgRed("Error:") + " Super Admin Account already exists"
        );
        process.exit(0);
      } else {
        const name = "super admin";
        const email = "super@marketeers.com";
        Admin.create({ name, email, isSuperAdmin: true }, (err, admin) => {
          if (err) {
            return console.error(err.message);
          }
          console.log(`${chalk.green(
            "Super Admin account generated successfully!"
          )} 
              ${chalk.blue("name:")} ${admin.name}
              ${chalk.blue("email:")} ${admin.email}
              ${chalk.blue("password:")} password
        please login and change your password`);

          process.exit(0);
        });
      }
    });
  })
  .catch((err) => {
    console.error("failed to connect to the database");
    console.log(error);
    process.exit(0);
  });
