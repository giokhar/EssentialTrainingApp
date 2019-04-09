# Essential Training App



### POST REQUESTS API -> returns `{"success":True/False}`<br>
___
### Create a new quiz:
**Callback url:** `/api/create/quiz` with data:<br>
`
{
	"title":"New Quiz",
	"question_json":"{'1':5,'2':9}",
	"is_published":1,
	"course_id":2
}
`<br>

### Create a new question template:


