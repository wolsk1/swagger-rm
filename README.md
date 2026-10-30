## Install

1. Navigate to the project directory.
2. Run `npm install` to install the dependencies.

## Run

1. Start the project by running `npm run dev`.
2. Open `http://localhost:3000/api-docs` for the interactive Swagger UI.
3. The raw OpenAPI specification is available at `http://localhost:3000/api-docs.json`.

## API

The patient endpoints are served under `/api/v1`:

- `GET /patients` lists all patient records.
- `GET /patients/{id}` retrieves one patient by its UUID.
- `POST /patients` creates a patient and returns its generated UUID.
- `PUT /patients/{id}` updates the supplied fields for a patient.
- `DELETE /patients/{id}` deletes a patient and returns `204 No Content`.

The Swagger UI documents request bodies, response schemas, examples, and status codes for each endpoint.
