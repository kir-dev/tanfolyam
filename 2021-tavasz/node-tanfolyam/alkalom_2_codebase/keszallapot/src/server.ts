import 'dotenv/config'
import { createConnection } from 'typeorm'
import app from './app'

createConnection().then(conn => {
  const server = app.listen(app.get('port'), () => {
    console.log(
      'App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env')
    )

    console.log('Press CTRL-C to stop\n')
  })
}).catch(console.error)
