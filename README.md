# Date Prediction Coding Exercise

## Overview

Please find provided a CSV file containing observed dates for monthly direct debits and standing orders.

Each series of dates has its own series identifier and the date each transaction in the series was observed.

Your task is to predict the next date of the series taking into account the following:

- The simplest solution is preferred, even if it is not the most accurate. Although these two criteria, simplicity and accuracy, need to be balanced.
- No assessment of accuracy needs to be provided, a reasoned argument can be presented when answering the questions below.
- We program in a functional style and the use of RamdaJS is encouraged as we use the library extensively <https://ramdajs.com/docs/>. Some RamdaJS methods we commonly use are compose, groupBy, map, reduce, aperture and mapAccum amongst others. Sometimes we use a mix of functional and imperative style so do not feel the need to make everything functional, especially if it is at the expense of readability. However, consider immutability a key principle that should be upheld where possible, i.e. avoid reassigning identifiers or mutating objects.
- Results should be produced in CSV or JSON format.
- The exercise should take no more than an hour and reflects the day to day work conducted by the Data Team so hopefully should be fun.

## Questions

### Describe the method you used to predict the next date and why you chose it?

I grouped series of transactions by user id. For each series, I've calculated the average distance between the dates and added the average to the latest date. Finally, generate a new document file with the added dates.

I’ve chosen this method because it’s the easiest way to provide a forecasting that I could think of.

### What strategy would you use to implement a more accurate date prediction mechanism? 

I guess there is many approaches we can take, for example:

Divide the series of transactions of each user (if the quantity of transactions is suficient) into smaller chunks of trimester/yearly operations. Then, calculating the tendency of each chunk or performing a regression with the values. A graphical view of this values probably can help in here.

References:
- https://en.wikipedia.org/wiki/Moving_average

### What estimate would you give in terms of implementation effort required?

To estimate this task, we can divide it into smaller chunks. We have several distinct parts:
1. Investigation. (1 - 4 days) I would check the scope of the task with the team and research the best algorithm for this specific problem. Is there any libraries or models in our application that we can reuse?
2. Implementing a solution. (2 days)
3. Testing the solution and its accuracy. (1 day)
4. Creating a Pull Request with the solution and requesting team review. After the review, implement discussed changes. (1 day)

### How would you test the accuracy of date prediction?

Dividing the sample into two groups: A and B. We can use the data from group A to train our model and test the trained model over group B. This would give us useful feedback regarding the accuracy of the model and the possibility to calibrate the implementation.

Also, we can check outlier values and test the accuracy of our prediction with and without these values.