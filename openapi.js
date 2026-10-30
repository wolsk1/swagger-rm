const patientExample = {
  id: '621c7f80-cefb-47d5-b2b4-01f7c3f25b99',
  patient_id: 'P1002',
  patient_name: 'Jane Smith',
  gender: 'Female',
  date_of_birth: '1990-09-28',
  visit_date: '2023-01-05',
  symptoms: 'Cough and sore throat',
  diagnosis: 'Bronchitis',
  medication: 'Amoxicillin',
  dosage: '500mg'
}

const patientProperties = {
  id: { type: 'string', format: 'uuid', readOnly: true },
  patient_id: { type: 'string', example: 'P1002' },
  patient_name: { type: 'string', example: 'Jane Smith' },
  gender: { type: 'string', example: 'Female' },
  date_of_birth: { type: 'string', format: 'date', example: '1990-09-28' },
  visit_date: { type: 'string', format: 'date', example: '2023-01-05' },
  symptoms: { type: 'string', example: 'Cough and sore throat' },
  diagnosis: { type: 'string', example: 'Bronchitis' },
  medication: { type: 'string', example: 'Amoxicillin' },
  dosage: { type: 'string', example: '500mg' }
}

const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Patient Records API',
    version: '1.0.0',
    description:
      'REST API for creating, viewing, updating, and deleting patient records.'
  },
  servers: [{ url: '/api/v1', description: 'This server' }],
  tags: [{ name: 'Patients', description: 'Patient record operations' }],
  paths: {
    '/patients': {
      get: {
        tags: ['Patients'],
        summary: 'List all patients',
        responses: {
          200: {
            description: 'Patient records returned.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Patient' }
                },
                example: [patientExample]
              }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      },
      post: {
        tags: ['Patients'],
        summary: 'Create a patient',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PatientInput' },
              example: {
                patient_id: patientExample.patient_id,
                patient_name: patientExample.patient_name,
                gender: patientExample.gender,
                date_of_birth: patientExample.date_of_birth,
                visit_date: patientExample.visit_date,
                symptoms: patientExample.symptoms,
                diagnosis: patientExample.diagnosis,
                medication: patientExample.medication,
                dosage: patientExample.dosage
              }
            }
          }
        },
        responses: {
          201: {
            description:
              'Patient created; the response includes its generated ID.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Patient' },
                example: patientExample
              }
            }
          },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      }
    },
    '/patients/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'The UUID assigned to the patient record.',
          schema: { type: 'string', format: 'uuid' },
          example: patientExample.id
        }
      ],
      get: {
        tags: ['Patients'],
        summary: 'Get a patient by ID',
        responses: {
          200: {
            description: 'Patient record returned.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Patient' },
                example: patientExample
              }
            }
          },
          404: { $ref: '#/components/responses/NotFound' },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      },
      put: {
        tags: ['Patients'],
        summary: 'Update a patient by ID',
        description:
          'Updates the supplied fields and preserves fields omitted from the request.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PatientInput' },
              example: {
                diagnosis: 'Acute bronchitis',
                medication: 'Amoxicillin'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Updated patient record returned.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Patient' },
                example: patientExample
              }
            }
          },
          404: { $ref: '#/components/responses/NotFound' },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      },
      delete: {
        tags: ['Patients'],
        summary: 'Delete a patient by ID',
        responses: {
          204: { description: 'Patient deleted; no response body.' },
          404: { $ref: '#/components/responses/NotFound' },
          500: { $ref: '#/components/responses/InternalServerError' }
        }
      }
    }
  },
  components: {
    schemas: {
      Patient: {
        type: 'object',
        properties: patientProperties,
        example: patientExample
      },
      PatientInput: {
        type: 'object',
        description:
          'Patient fields to create or update. The ID is generated by the API.',
        properties: Object.fromEntries(
          Object.entries(patientProperties).filter(([name]) => name !== 'id')
        ),
        example: {
          patient_id: patientExample.patient_id,
          patient_name: patientExample.patient_name,
          gender: patientExample.gender,
          date_of_birth: patientExample.date_of_birth,
          visit_date: patientExample.visit_date,
          symptoms: patientExample.symptoms,
          diagnosis: patientExample.diagnosis,
          medication: patientExample.medication,
          dosage: patientExample.dosage
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      }
    },
    responses: {
      NotFound: {
        description: 'No patient found with the provided ID.',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
            example: { error: 'No patient found with the provided ID.' }
          }
        }
      },
      InternalServerError: {
        description: 'An internal server error occurred.',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
            example: { error: 'An internal server error occurred.' }
          }
        }
      }
    }
  }
}

export default openApiSpec
