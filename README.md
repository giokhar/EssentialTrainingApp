# Essential Training App

## Front & Back communication


### Creating a new quiz:
**Callback url:** `/api/create/quiz` with data:
`
{
	"title":"New Quiz",
	"question_json":"{'1':5,'2':9}",
	"is_published":1,
	"course_id":2
}
`
