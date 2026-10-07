# Partner Auth SDUI JSON Normalization & Template ID Specification

## 1. Overview

This document defines the exact contract updates for the Partner authentication and application startup/bootstrap flow.

### Key Changes
1. **Template ID Naming Standard**: All Partner templates follow `tpl_P<3-digit-screen-number><screen-code>`.
2. **Universal Destination Structure**: Standardized navigation objects under `destination`.
3. **Action Payload Normalization**: Direct navigation actions now place `destination` at top-level (`type: "navigate", destination: { ... }`) without an unnecessary `payload` wrapper.

---

## 2. Template ID Mapping

| Screen ID | Old Template ID | New Template ID | Template Type |
| :--- | :--- | :--- | :--- |
| `partner_login` | `tpl_7K2M9Q` | `tpl_P101L` | `form_template` |
| `partner_otp` | `tpl_P6X8N3` | `tpl_P102O` | `form_template` |

---

## 3. Universal Destination Structure

Wherever a navigation target is returned, the backend uses the following structure:

```json
"destination": {
  "screenId": "partner_login",
  "templateId": "tpl_P101L",
  "templateType": "form_template",
  "endpoint": "/api/v1/partner/screen/auth_login"
}
```

*Note: Transport metadata (`method`, `authentication`) has been removed from `destination` as it is not part of destination identity.*

---

## 4. API Endpoints & Contract Examples

### 4.1 Partner Bootstrap (`GET /api/v1/partner/config/bootstrap`)

#### Response (`200 OK`)
```json
{
  "status": 200,
  "code": "SUCCESS",
  "message": "Partner bootstrap completed",
  "data": {
    "config": {
      "version": "1",
      "maintenance": { "enabled": false, "title": null, "message": null },
      "update": { "required": false, "optional": false, "minimumVersion": "1.0.0", "latestVersion": "1.0.0", "storeUrl": null },
      "features": { "registrationEnabled": true, "individualPartnerEnabled": true, "organizationPartnerEnabled": true }
    },
    "startup": {
      "authenticated": false,
      "destination": {
        "screenId": "partner_login",
        "templateId": "tpl_P101L",
        "templateType": "form_template",
        "endpoint": "/api/v1/partner/screen/auth_login"
      }
    }
  },
  "traceId": "..."
}
```

---

### 4.2 Partner Login Screen (`GET /api/v1/partner/screen/auth_login`)

#### Response (`200 OK`)
```json
{
  "status": 200,
  "code": "SUCCESS",
  "message": "Success",
  "data": {
    "screenId": "partner_login",
    "schemaVersion": "3.0.0",
    "targetApp": "PARTNER",
    "template": {
      "id": "tpl_P101L",
      "type": "form_template",
      "components": [ ... ]
    }
  }
}
```

---

### 4.3 Send OTP (`POST /api/v1/partner/auth/send_otp`)

#### Request Body
```json
{
  "phoneNumber": "9876543210",
  "deviceId": "device-123"
}
```

#### Response (`200 OK`)
```json
{
  "status": 200,
  "code": "SUCCESS",
  "message": "Success",
  "data": {
    "message": "OTP sent successfully",
    "challengeId": "33333333-3333-4333-8333-333333333333",
    "expiresInSeconds": 300,
    "resendAfterSeconds": 60,
    "isNewUser": true,
    "destination": {
      "screenId": "partner_otp",
      "templateId": "tpl_P102O",
      "templateType": "form_template",
      "endpoint": "/api/v1/partner/screen/auth_otp"
    }
  }
}
```

---

### 4.4 Partner OTP Screen (`GET /api/v1/partner/screen/auth_otp`)

#### Direct Navigation Action Example (Phone Edit Button)
```json
"onClick": {
  "type": "navigate",
  "destination": {
    "screenId": "partner_login",
    "templateId": "tpl_P101L",
    "templateType": "form_template",
    "endpoint": "/api/v1/partner/screen/auth_login"
  }
}
```

---

### 4.5 Verify OTP (`POST /api/v1/partner/auth/verify_otp`)

#### Response (`200 OK`)
```json
{
  "status": 200,
  "code": "SUCCESS",
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "...",
    "refreshToken": "...",
    "message": "Login successful",
    "destination": {
      "screenId": "partner_dashboard",
      "templateId": "partner_dashboard_template",
      "templateType": "default_template",
      "endpoint": "/api/v1/partner/sdui/registry/partner_dashboard"
    }
  }
}
```

---

## 5. Modified Source Files & Classes

### SDUI Engine Workspace (`sdui/engine/`)
- [`SduiModel.ts`](file:///d:/Backend/CarBroz/backend/sdui/engine/src/core/SduiModel.ts): Updated `dynamicDestinationSchema` and `navigateActionSchema`.
- [`Action.ts`](file:///d:/Backend/CarBroz/backend/sdui/engine/src/core/Action.ts): Updated `DynamicDestination` interface and `navigateAction` function.
- [`PartnerLoginScreen.ts`](file:///d:/Backend/CarBroz/backend/sdui/engine/src/screens/partner/PartnerLoginScreen.ts): Updated template ID to `tpl_P101L`.
- [`PartnerOtpScreen.ts`](file:///d:/Backend/CarBroz/backend/sdui/engine/src/screens/partner/PartnerOtpScreen.ts): Updated template ID to `tpl_P102O` and navigate action target.

### Configuration Domain Workspace (`domains/configuration/`)
- [`partner-bootstrap.ts`](file:///d:/Backend/CarBroz/backend/domains/configuration/application/contracts/partner-bootstrap.ts): Updated `PartnerStartupScreenConfig` and `PartnerBootstrapSnapshot`.
- [`GetPartnerBootstrapUseCase.ts`](file:///d:/Backend/CarBroz/backend/domains/configuration/application/use-cases/GetPartnerBootstrapUseCase.ts): Updated default guest template ID to `tpl_P101L` and returned `destination`.

### Identity Domain Workspace (`domains/identity/`)
- [`AuthUseCases.ts`](file:///d:/Backend/CarBroz/backend/domains/identity/application/AuthUseCases.ts): Updated `SendOtpResult` and `VerifyOtpResult` properties to `destination`.

### API Surface Workspace (`apps/api/`)
- [`auth.controller.ts`](file:///d:/Backend/CarBroz/backend/apps/api/src/transport/auth/auth.controller.ts): Updated `verifyOtp` response object to serialize `destination`.
