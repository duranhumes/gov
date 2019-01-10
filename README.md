# E-Government exploration (WIP)

Building to get a better understanding of how something like this would work. 
Example you as a new citizen in an e-gov country go to get your medical records and after going 
through the extensive process of vetting who you are and who your parents are and taking in all 
the necessary information etc you now have a medical record, Yipee! After doing that once all of 
your information is saved in the system indefinitely. Now fast-forward a few weeks later when you 
have to get your drivers license now the process will be streamlined because you wouldn't need to 
prove you are who you say you are with the usual documents since all of your latest information 
is already in the system the only thing left to do is pass the drivers test and get your photo taken 
since every government agency would have access to your basic information.

--

Now security would need to be first priority in a system like this for obvious reasons, you'd want to log 
every thing an authenticated government agent does like basic CRUD on a persons information and give agency 
heads the ability to rollback changes to a person's information at any point in history that pertains to that 
specific agency etc. And there would also be an identity strategy beyond the basic 'person' information.


--

The project is structured in a DDD style with the agency / person being the domain but in a non-trivial version those 
domains would be completely separate projects with more fine-grained domains for a particular agency & person.
