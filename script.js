import http from 'k6/http';
import { sleep } from 'k6';


export default function () {
let id = 9
  http.del(`http://localhost:3333/pets/${id}`)
}