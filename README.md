🔗 https://arcane-stream-07310.herokuapp.com

**NOTE: The application goes to sleep after 30 minutes of inactivity! If you are using this for an interview, you will want to make a request 
to it to wake it up _before_ a candidate attempts to.**

## Description

This project was build to surface a set of endpoints which can be consumed across a few engineering interviews across our organization.
The theme of the interview panels is centered around various flows associated to enable managing physical packages for a shipping company.endpoints provide the ability to manage physical packages for a shipping company and the

## Used by

The following interviews use this service as part of their panels:
- [Engineering manager](https://docs.google.com/document/d/1YPoo70oygcwCYd1PosJ04taKOaXqzI2INA4XZkXHxBk)
  - [Live data handling panel](https://docs.google.com/document/d/1wzQgVSH5J48crU-Drw814BgIwkAmNhTN8c3Fagh-atM) (vs API design option)
- [WIP] Front-end engineer
  - [Live data handling panel](https://docs.google.com/document/d/1TygYaFjtCe8MBiP1-bko6uGqh_BJjkYYZ5kNnM5Iv3o)
  - [UI coding panel](https://docs.google.com/document/d/1IiySxo-x_T6JhGJD9YknYq2RQ7GoI5lVVSO5GPvqk94)
  
## API & Implementation

- This is a [Nest](https://github.com/nestjs/nest) project
- Documentation is provided by Swagger and can be found live here: https://arcane-stream-07310.herokuapp.com/api/
- Packages are stored in memory by the service
- This repository is linked to a Heroku project and code updates will automatically be deployed

## Logging

- The code has logging added so that you should be able to follow along with what code is being hit as the service is accessed
- Logs can be found at https://dashboard.heroku.com/apps/arcane-stream-07310/logs
- If you do not have access to the above, ping @algcifaldi and she'll make sure you're added

## Development

### Running the app locally

```bash
# watch mode
$ yarn run start:dev
```

### Contributing

Contributions are welcome and encouraged as long as everyone is mindful of the fact that updates to this codebase will
redeploy the service. We don't want to do this while a candidate is in the middle of an interview, for example.


