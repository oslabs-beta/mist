# Database

## db_template.sql
This file allows users to create an instance of a SQL database that matches our template. The user must first set up their own postgresQL database and then carry out the terminal commands from the README to forge the link. All of the SQL commands in this file will be executed on their database, creating the **metrics** table with the appropriate columns.

## metrics_model.js

This is where the user inputs the URI of the postgresQL database they created. The user will have used our db_template.sql to instantiate a SQL database that contains our metrics table. Our **metrics_model** is exported and then imported in the metricsController.js file.