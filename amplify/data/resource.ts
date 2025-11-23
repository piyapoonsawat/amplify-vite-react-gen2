import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization(allow => [allow.owner()]),

  Event: a.model({
    name: a.string().required(),
    owner: a.string().required(),
    date: a.string(),
    description: a.string()
  })
  .authorization(allow => [
    allow.owner(),
    allow.guest().to(['read'])
  ]),
  
  Form: a.model({
    eventID: a.string().required(),
    fields: a.string(),
    owner: a.string() 
  })
  .authorization(allow => [
    allow.owner(),
    allow.guest().to(['read'])
  ]),


  Attendee: a.model({
    eventID: a.string().required(),
    name: a.string(),
    email: a.string(),
    checkedIn: a.boolean(),
    eventOwner: a.string()
  })
  .authorization(allow => [
    allow.guest().to(['create']),
    allow.ownerDefinedIn('eventOwner').to(['read','update','delete']) 
  ])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

