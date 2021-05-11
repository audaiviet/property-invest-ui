# Use Case: 001 User can invest in a project
--------------------------------------------------
## CHARACTERISTIC INFORMATION
GOAL IN CONTEXT:  
User can invest in a project, expect to transfer fund and receive receipt/confirmation and return of capital + interest at the end of the project.

SCOPE: Company  
LEVEL: Summary  
PRECONDITIONS: User is viewing a project details page with selectable investment buttons.  
SUCCESS END CONDITION: User is invested, we have the fund for the user's investment in the project.  
FAILED END CONDITION: The process failed, User has not transfered the money.
PRIMARY ACTOR: User  
TRIGGER: User wants to invest in a project  

----------------------------------------
## MAIN SUCCESS SCENARIO
1. User select a button to invest
2. Payment page opens with an investment amount (£1000, £5000, £10000)
3. User fill in details and submit payment
4. Payment is successfully processed
5. User investment account is updated with details
6. Email sent to admin
7. User is presented with information page of her new investment (with link to her investment account)
8. Email confirmation is sent to user 
----------------------------------------
## EXTENSIONS  
- 1a. No selectable invest button. The project must have completed.  
    - 1a1. Select another project  
- 1b. User is not registered   
    - 1b1. Redirect to User registration page  
    - 1b2. Return to payment page after successful user registration.  
- 4a. Payment processing failed  
    - 4a1. Return to payment page 3 times at most then fail.  
----------------------------------------
## SUB-VARIATIONS
1. Buyer may phone in to invesr
2. Buyer may pay sending in a check through the mail
----------------------------------------
## RELATED INFORMATION
### Priority: top
### Performance Target: 10 minutes for user to complete investment process
### Frequency: 10/day
### Superordinate Use Case: Manage customer relationship (use case 2)
### Subordinate Use Cases:
    - Create/update user investment account (use case 2)
    - Take online payment 
    - Send email to user/admin
### Channel to primary actor: may be phone, email, possibly website user inbox
### Secondary Actors: payment processing company, bank
### Channels to Secondary Actors: Phone, email
----------------------------------------
## OPEN ISSUES
----------------------------------------
## SUB-VARIATIONS
----------------------------------------
## SUB-VARIATIONS

