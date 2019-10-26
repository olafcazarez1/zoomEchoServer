import { Component, OnInit } from '@angular/core';
import { Logger } from '../shared/log.service';
import { EchoService } from '../echo-service.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css'],
  providers:  [ Logger, EchoService ]
})
export class ZoomComponent implements OnInit {

  constructor(private logger: Logger, private rest: EchoService) { }

  ngOnInit() {
  }

  sendRequest() {

    const startTime = (Date.now() / 1000);

    const response = this.rest.sendMessage(
      $('#request_method').val(),
      $('#json_data').val()
    ).subscribe(
      data => {
        $('#server_response').val(
          'Start Time: ' + startTime + '\n' +
          'End Time: ' + (Date.now() / 1000) + '\n' +
          'Response: ' + JSON.stringify(data));
      },
      err => {
        if (err.error instanceof Error) {
          $('#server_response').val(
            'Start Time: ' + startTime + '\n' +
            'End Time: ' + (Date.now() / 1000) + '\n' +
            'A Client Side Error Occurred: ' + err.error.message + '\n' );
        } else {
          this.logger.log(err);

          switch (err.status) {
            case 0:
                $('#server_response').val(
                  'Start Time: ' + startTime + '\n' +
                  'End Time: ' + (Date.now() / 1000) + '\n' +
                  'Status Code: 0\n' +
                  'Message: Connection Refused\n' );
              break;
            default:
              $('#server_response').val(
                'Start Time: ' + startTime + '\n' +
                'End Time: ' + (Date.now() / 1000) + '\n' +
                'Status Code: ' + err.status + '\n' +
                'Message: ' + err.error + '\n' );
              break;
          }
        }
      }
    );

    return false;
  }

}
