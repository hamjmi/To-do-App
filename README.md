# To-do-App

Author: Mohd Hamid
EmailId: hamid7825@gmail.com

This is a simple Nodejs and Mongodb based Placement application.
It consist of registering and unregistering student from database, registering and unregistering company from database
and registering and unregistering student to any company from database



Module Used:
Express: to handle request.
Mongoose: to connect to the mongobd
bodyParser: to easily access and manipulate data sent from the form.

We are using EJS template engine to make the code readable and also to display dynamic pages.
All css and images are stored in public folder.
Table Schema are imported from database/model folder.

Various Middleware are created to validate the input from the form. If ant field is missing then redirect to original page.
It also checks whether the entered data is already present or not, and apprpriate message is created and rediected if required.
Otherwise proceed to actual processing of the iput values.

Various get request handler to appropriately render pages as required.

Various post request handler to appropriately handle the post request to find, delete or create records from various databases.


Also when we delete a student then all record of that student registering to any company is also deleted.
similarly when we delete a company then all record of that company registering by any student is also deleted.

Important: We are using rollno as unique entity for any student record, company name for company record and combination of rollno & company name for company-student table.

It can perform following tasks:

1. Add Student Record: to enter student data in to the database.
2. Remove Student Record: to delete student data in to the database.
3. Edit Student Record: to update student data in to the database.
4. Search Student Record: to search student data in to the database.
5. Register Company: to enter company data in to the database.
6. Unregister Company: to delete company data in to the database.
7. Register student for Company: to register a student for any company in the database.
8. Unregister student for Company: to unregister a student for any company in the database.
9. Show all company registered by student: to show all the company names that has been registered by any student.
10. Show all student registered for student: to show all the student rollno that has been registered to any company.
