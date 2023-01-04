#include <stdio.h>

int main(void){
int i;
char* englishname = "Mohamed raafat abdel aziz";
char* arabicName = "سالم الحمود سالم الحمود";
char* nationality = "Egyptian";
char* gender = "MALE";
char* religion = "MUSLIM";
char* birthDate = "06-16-2000";
char* birthPlace = "Ismailia";
char* guardianName = "raafat adbel aziz ayoub";
char* contactPhone = "01010931887";
char* homePhone = "3237034";
char* address = "Abdel aziz ali ghait";
int schoolSeat = 940233;
int schoolMarks = 398;
char* enrollmenty = "2020";
long long int national = 90808661999343;

FILE *file;
file = fopen("qqx.csv", "w");
if (file == NULL)
{
	printf("err\n");
	return (1);
}
for(i = 0; i < 1000; i++)
{
	fprintf(file, "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %d, %d, %s, %lld\n", englishname, arabicName, gender, religion, birthDate, birthPlace, guardianName, contactPhone, homePhone, address, schoolSeat++, schoolMarks, enrollmenty, national++);
}
return (0);
}

