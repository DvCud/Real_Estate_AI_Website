# Real Estate AI Investment Platform - API Documentation

## Overview

This document provides comprehensive documentation for the Real Estate AI Investment Platform API. The API enables developers to programmatically access property data, financial analysis, AI predictions, and other platform features.

## Base URL

```
Production: https://api.realestate-ai-platform.com/v1
Staging: https://staging-api.realestate-ai-platform.com/v1
Development: https://dev-api.realestate-ai-platform.com/v1
```

## Authentication

The API uses OAuth 2.0 for authentication. To access the API, you need to obtain an access token.

### Obtaining Access Token

**Endpoint:** `/auth/token`

**Method:** POST

**Request:**

```json
{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "grant_type": "client_credentials"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### Using the Access Token

Include the access token in the Authorization header for all API requests:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Rate Limiting

The API implements rate limiting to ensure fair usage and system stability:

- Standard tier: 100 requests per minute
- Premium tier: 500 requests per minute
- Enterprise tier: Custom limits based on agreement

Rate limit information is included in the response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1620000000
```

## Error Handling

The API uses standard HTTP status codes and returns detailed error messages in JSON format:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The property ID is invalid or not found",
    "details": {
      "field": "property_id",
      "reason": "not_found"
    }
  },
  "request_id": "f67a3dc2-9c8b-4c42-ba80-5a2b50e12c33"
}
```

### Common Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | invalid_request | The request is malformed or contains invalid parameters |
| 401 | unauthorized | Authentication is required or has failed |
| 403 | forbidden | The authenticated user doesn't have permission |
| 404 | not_found | The requested resource doesn't exist |
| 429 | rate_limit_exceeded | The rate limit has been exceeded |
| 500 | internal_error | An unexpected error occurred on the server |

## API Endpoints

### Properties

#### List Properties

Retrieve a list of properties based on search criteria.

**Endpoint:** `/properties`

**Method:** GET

**Query Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| location | string | City, state, or zip code | No |
| property_type | string | Type of property (single_family, multi_family, commercial, land) | No |
| min_price | number | Minimum price | No |
| max_price | number | Maximum price | No |
| min_cap_rate | number | Minimum capitalization rate | No |
| min_cash_flow | number | Minimum monthly cash flow | No |
| min_roi | number | Minimum return on investment | No |
| max_risk_score | number | Maximum risk score (1-10) | No |
| limit | integer | Number of results per page (default: 20, max: 100) | No |
| offset | integer | Pagination offset | No |
| sort_by | string | Field to sort by (price, cap_rate, cash_flow, roi, risk_score) | No |
| sort_order | string | Sort order (asc, desc) | No |

**Response:**

```json
{
  "data": [
    {
      "property_id": "prop_12345",
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zip": "90210",
        "latitude": 34.0522,
        "longitude": -118.2437
      },
      "property_type": "single_family",
      "price": 450000,
      "bedrooms": 3,
      "bathrooms": 2,
      "square_feet": 1850,
      "year_built": 1985,
      "lot_size": 0.25,
      "financial_summary": {
        "estimated_rent": 2600,
        "estimated_expenses": 650,
        "net_operating_income": 23400,
        "cap_rate": 0.052,
        "cash_flow": 320,
        "cash_on_cash_return": 0.043
      },
      "ai_score": 94,
      "risk_score": 2.1,
      "opportunity_score": 8.7,
      "created_at": "2023-05-01T12:00:00Z",
      "updated_at": "2023-05-15T14:30:00Z"
    },
    // Additional properties...
  ],
  "pagination": {
    "total": 157,
    "limit": 20,
    "offset": 0,
    "next_offset": 20
  }
}
```

#### Remove Property from Portfolio

Remove a property from a portfolio.

**Endpoint:** `/portfolio/{portfolio_id}/properties/{property_id}`

**Method:** DELETE

**Path Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| portfolio_id | string | Unique portfolio identifier | Yes |
| property_id | string | Unique property identifier | Yes |

**Response:**

```json
{
  "data": {
    "portfolio_id": "portfolio_12345",
    "property_id": "prop_34567",
    "message": "Property successfully removed from portfolio"
  }
}
```

#### Analyze Portfolio

Perform comprehensive analysis on a portfolio.

**Endpoint:** `/portfolio/{portfolio_id}/analyze`

**Method:** GET

**Path Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| portfolio_id | string | Unique portfolio identifier | Yes |

**Response:**

```json
{
  "data": {
    "portfolio_id": "portfolio_12345",
    "analysis_id": "portfolio_analysis_12345",
    "summary": {
      "total_properties": 8,
      "total_value": 3200000,
      "total_equity": 1100000,
      "total_debt": 2100000,
      "monthly_cash_flow": 4850,
      "annual_cash_flow": 58200,
      "average_metrics": {
        "cap_rate": 0.058,
        "cash_on_cash_return": 0.062,
        "roi": 0.145
      }
    },
    "diversification": {
      "property_type_diversity": 0.68,
      "location_diversity": 0.72,
      "risk_diversity": 0.65,
      "recommendations": [
        "Consider adding commercial properties to increase diversification",
        "Portfolio is well-diversified across neighborhoods"
      ]
    },
    "risk_analysis": {
      "overall_risk_score": 2.8,
      "risk_level": "low-medium",
      "risk_factors": [
        {
          "factor": "market_concentration",
          "score": 3.2,
          "description": "37.5% of properties in North Side neighborhood"
        },
        {
          "factor": "cash_flow_stability",
          "score": 2.5,
          "description": "Strong positive cash flow across most properties"
        },
        {
          "factor": "leverage",
          "score": 2.9,
          "description": "Average LTV ratio of 65.6%"
        },
        {
          "factor": "property_condition",
          "score": 2.4,
          "description": "Most properties in good condition with low maintenance needs"
        }
      ],
      "stress_test": {
        "vacancy_increase": {
          "scenario": "5% increase in vacancy rates",
          "impact": {
            "monthly_cash_flow_change": -1250,
            "cash_on_cash_return_change": -0.014
          }
        },
        "interest_rate_increase": {
          "scenario": "1% increase in interest rates",
          "impact": {
            "monthly_cash_flow_change": -1750,
            "cash_on_cash_return_change": -0.019
          }
        },
        "property_value_decrease": {
          "scenario": "10% decrease in property values",
          "impact": {
            "equity_change": -320000,
            "ltv_change": 0.073
          }
        }
      }
    },
    "performance_analysis": {
      "historical_performance": {
        "one_year": {
          "total_return": 0.145,
          "cash_flow_return": 0.053,
          "appreciation_return": 0.092,
          "benchmark_comparison": 0.058
        },
        "three_year": {
          "total_return": 0.385,
          "cash_flow_return": 0.155,
          "appreciation_return": 0.23,
          "benchmark_comparison": 0.125
        }
      },
      "property_comparison": {
        "best_performing": {
          "property_id": "prop_34567",
          "address": "789 Pine St, Anytown, CA 90210",
          "total_roi": 0.12
        },
        "worst_performing": {
          "property_id": "prop_12345",
          "address": "123 Main St, Anytown, CA 90210",
          "total_roi": 0.065
        }
      }
    },
    "optimization_recommendations": [
      {
        "recommendation": "Refinance property prop_12345 to improve cash flow",
        "impact": {
          "monthly_cash_flow_change": 250,
          "annual_cash_flow_change": 3000
        }
      },
      {
        "recommendation": "Increase rent on property prop_23456 by $150",
        "impact": {
          "monthly_cash_flow_change": 150,
          "annual_cash_flow_change": 1800
        }
      },
      {
        "recommendation": "Consider selling property prop_12345 and reinvesting in higher cash flow property",
        "impact": {
          "potential_monthly_cash_flow_improvement": 500,
          "potential_annual_cash_flow_improvement": 6000
        }
      }
    ],
    "created_at": "2023-05-20T17:30:00Z"
  }
}
```

### Reports

#### Generate Investment Report

Generate a comprehensive investment report for a property or portfolio.

**Endpoint:** `/reports/investment`

**Method:** POST

**Request:**

```json
{
  "report_type": "property",
  "property_id": "prop_12345",
  "time_period": {
    "start_date": "2022-05-15",
    "end_date": "2023-05-15"
  },
  "include_sections": [
    "financial_summary",
    "cash_flow_analysis",
    "roi_analysis",
    "market_analysis",
    "risk_assessment",
    "recommendations"
  ],
  "format": "pdf"
}
```

**Response:**

```json
{
  "data": {
    "report_id": "report_12345",
    "report_type": "property",
    "property_id": "prop_12345",
    "status": "processing",
    "estimated_completion_time": "2023-05-20T18:05:00Z",
    "created_at": "2023-05-20T18:00:00Z"
  }
}
```

#### Get Report Status

Check the status of a report generation request.

**Endpoint:** `/reports/{report_id}/status`

**Method:** GET

**Path Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| report_id | string | Unique report identifier | Yes |

**Response:**

```json
{
  "data": {
    "report_id": "report_12345",
    "status": "completed",
    "download_url": "https://storage.realestate-ai-platform.com/reports/report_12345.pdf",
    "expires_at": "2023-05-27T18:05:00Z",
    "created_at": "2023-05-20T18:00:00Z",
    "completed_at": "2023-05-20T18:05:00Z"
  }
}
```

#### List Available Reports

Retrieve a list of available reports.

**Endpoint:** `/reports`

**Method:** GET

**Query Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| report_type | string | Type of report (property, portfolio, market) | No |
| property_id | string | Filter reports by property | No |
| portfolio_id | string | Filter reports by portfolio | No |
| start_date | string | Filter reports created after this date | No |
| end_date | string | Filter reports created before this date | No |
| limit | integer | Number of results per page (default: 20, max: 100) | No |
| offset | integer | Pagination offset | No |

**Response:**

```json
{
  "data": {
    "reports": [
      {
        "report_id": "report_12345",
        "report_type": "property",
        "property_id": "prop_12345",
        "name": "123 Main St Investment Report",
        "format": "pdf",
        "download_url": "https://storage.realestate-ai-platform.com/reports/report_12345.pdf",
        "created_at": "2023-05-20T18:00:00Z"
      },
      {
        "report_id": "report_23456",
        "report_type": "portfolio",
        "portfolio_id": "portfolio_12345",
        "name": "Primary Investment Portfolio Report",
        "format": "pdf",
        "download_url": "https://storage.realestate-ai-platform.com/reports/report_23456.pdf",
        "created_at": "2023-05-19T14:30:00Z"
      },
      {
        "report_id": "report_34567",
        "report_type": "market",
        "location": "Anytown, CA",
        "name": "Anytown Market Analysis",
        "format": "pdf",
        "download_url": "https://storage.realestate-ai-platform.com/reports/report_34567.pdf",
        "created_at": "2023-05-18T10:15:00Z"
      }
    ],
    "pagination": {
      "total": 8,
      "limit": 20,
      "offset": 0
    }
  }
}
```

## Webhooks

The API supports webhooks for real-time notifications about various events.

### Register Webhook

**Endpoint:** `/webhooks`

**Method:** POST

**Request:**

```json
{
  "url": "https://your-application.com/webhook-endpoint",
  "events": [
    "property.created",
    "property.updated",
    "property.deleted",
    "portfolio.property.added",
    "portfolio.property.removed",
    "report.completed"
  ],
  "secret": "your_webhook_secret"
}
```

**Response:**

```json
{
  "data": {
    "webhook_id": "webhook_12345",
    "url": "https://your-application.com/webhook-endpoint",
    "events": [
      "property.created",
      "property.updated",
      "property.deleted",
      "portfolio.property.added",
      "portfolio.property.removed",
      "report.completed"
    ],
    "status": "active",
    "created_at": "2023-05-20T19:00:00Z"
  }
}
```

### Webhook Payload Example

When an event occurs, the API will send a POST request to your webhook URL with a payload similar to the following:

```json
{
  "event": "property.updated",
  "webhook_id": "webhook_12345",
  "timestamp": "2023-05-20T19:30:00Z",
  "data": {
    "property_id": "prop_12345",
    "address": "123 Main St, Anytown, CA 90210",
    "updated_fields": ["price", "description"]
  }
}
```

### Webhook Security

All webhook requests include an `X-Webhook-Signature` header that you can use to verify the authenticity of the request. The signature is a HMAC SHA-256 hash of the request body using your webhook secret as the key.

## Conclusion

This API documentation provides a comprehensive overview of the Real Estate AI Investment Platform API. For additional support or questions, please contact our developer support team at api-support@realestate-ai-platform.com.
    },
    "risk_assessment": {
      "overall_risk": "low",
      "risk_score": 2.1,
      "property_risk": {
        "score": 1.8,
        "factors": [
          {
            "factor": "property_condition",
            "score": 1.5,
            "description": "Good condition with recent updates"
          },
          {
            "factor": "property_age",
            "score": 2.5,
            "description": "Built in 1985, some systems may need updates"
          }
          // Additional factors...
        ]
      },
      "market_risk": {
        "score": 1.9,
        "factors": [
          {
            "factor": "market_stability",
            "score": 1.7,
            "description": "Stable market with consistent growth"
          },
          {
            "factor": "demand_supply",
            "score": 2.1,
            "description": "Slightly more demand than supply"
          }
          // Additional factors...
        ]
      },
      "financial_risk": {
        "score": 3.2,
        "factors": [
          {
            "factor": "cash_flow",
            "score": 4.5,
            "description": "Negative cash flow is a concern"
          },
          {
            "factor": "debt_coverage",
            "score": 3.8,
            "description": "DSCR below 1.0 indicates risk"
          }
          // Additional factors...
        ]
      },
      "natural_hazard_risk": {
        "score": 1.5,
        "factors": [
          {
            "factor": "flood_risk",
            "score": 1.2,
            "description": "Property not in flood zone"
          },
          {
            "factor": "wildfire_risk",
            "score": 1.8,
            "description": "Low wildfire risk area"
          }
          // Additional factors...
        ]
      }
    },
    "ai_analysis": {
      "investment_score": 94,
      "strengths": [
        "Strong rental demand in neighborhood",
        "Property priced below market value",
        "Low maintenance requirements based on condition"
      ],
      "concerns": [
        "Aging roof (5-7 years remaining life)",
        "Negative cash flow with current financing terms"
      ],
      "optimization_recommendations": [
        {
          "recommendation": "Increase rent",
          "target": 2800,
          "impact": {
            "monthly_cash_flow_change": 200,
            "cash_on_cash_return_change": 0.027
          }
        },
        {
          "recommendation": "Negotiate purchase price",
          "target": 435000,
          "impact": {
            "monthly_cash_flow_change": 75,
            "cash_on_cash_return_change": 0.01
          }
        },
        {
          "recommendation": "Refinance at lower rate",
          "target": 0.04,
          "impact": {
            "monthly_cash_flow_change": 96,
            "cash_on_cash_return_change": 0.013
          }
        }
      ]
    },
    "comparable_properties": [
      "prop_23456",
      "prop_34567",
      "prop_45678"
    ],
    "documents": [
      {
        "document_id": "doc_12345",
        "type": "property_tax_record",
        "url": "https://storage.realestate-ai-platform.com/documents/doc_12345.pdf",
        "created_at": "2023-04-15T10:30:00Z"
      },
      {
        "document_id": "doc_23456",
        "type": "title_report",
        "url": "https://storage.realestate-ai-platform.com/documents/doc_23456.pdf",
        "created_at": "2023-04-16T14:45:00Z"
      }
      // Additional documents...
    ],
    "created_at": "2023-05-01T12:00:00Z",
    "updated_at": "2023-05-15T14:30:00Z"
  }
}
```

#### Create Property

Add a new property to the system.

**Endpoint:** `/properties`

**Method:** POST

**Request:**

```json
{
  "address": {
    "street": "456 Oak Ave",
    "city": "Anytown",
    "state": "CA",
    "zip": "90210"
  },
  "property_type": "single_family",
  "price": 325000,
  "bedrooms": 2,
  "bathrooms": 1,
  "square_feet": 1200,
  "year_built": 1975,
  "lot_size": 0.18,
  "description": "Charming single-family home in quiet neighborhood. Updated bathroom, new roof (2021)."
}
```

**Response:**

```json
{
  "data": {
    "property_id": "prop_67890",
    "address": {
      "street": "456 Oak Ave",
      "city": "Anytown",
      "state": "CA",
      "zip": "90210",
      "latitude": 34.0548,
      "longitude": -118.2498
    },
    "property_type": "single_family",
    "price": 325000,
    "bedrooms": 2,
    "bathrooms": 1,
    "square_feet": 1200,
    "year_built": 1975,
    "lot_size": 0.18,
    "description": "Charming single-family home in quiet neighborhood. Updated bathroom, new roof (2021).",
    "created_at": "2023-05-20T09:15:00Z",
    "updated_at": "2023-05-20T09:15:00Z"
  }
}
```

#### Update Property

Update an existing property.

**Endpoint:** `/properties/{property_id}`

**Method:** PUT

**Path Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| property_id | string | Unique property identifier | Yes |

**Request:**

```json
{
  "price": 335000,
  "description": "Charming single-family home in quiet neighborhood. Updated bathroom, new roof (2021), freshly painted interior."
}
```

**Response:**

```json
{
  "data": {
    "property_id": "prop_67890",
    "address": {
      "street": "456 Oak Ave",
      "city": "Anytown",
      "state": "CA",
      "zip": "90210",
      "latitude": 34.0548,
      "longitude": -118.2498
    },
    "property_type": "single_family",
    "price": 335000,
    "bedrooms": 2,
    "bathrooms": 1,
    "square_feet": 1200,
    "year_built": 1975,
    "lot_size": 0.18,
    "description": "Charming single-family home in quiet neighborhood. Updated bathroom, new roof (2021), freshly painted interior.",
    "created_at": "2023-05-20T09:15:00Z",
    "updated_at": "2023-05-20T10:30:00Z"
  }
}
```

#### Delete Property

Remove a property from the system.

**Endpoint:** `/properties/{property_id}`

**Method:** DELETE

**Path Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| property_id | string | Unique property identifier | Yes |

**Response:**

```json
{
  "data": {
    "message": "Property successfully deleted",
    "property_id": "prop_67890"
  }
}
```

### Financial Analysis

#### Analyze Property

Perform financial analysis on a property.

**Endpoint:** `/financial/analyze`

**Method:** POST

**Request:**

```json
{
  "property_id": "prop_12345",
  "parameters": {
    "purchase_price": 450000,
    "down_payment_percentage": 20,
    "interest_rate": 4.5,
    "loan_term": 30,
    "closing_costs": 13500,
    "renovation_budget": 5000,
    "monthly_rent": 2600,
    "other_income": 50,
    "vacancy_rate": 5,
    "property_tax_annual": 5000,
    "insurance_annual": 1200,
    "maintenance_percentage": 1,
    "property_management_percentage": 10,
    "utilities_monthly": 50,
    "hoa_monthly": 0,
    "capex_percentage": 5
  }
}
```

**Response:**

```json
{
  "data": {
    "property_id": "prop_12345",
    "analysis_id": "analysis_12345",
    "parameters": {
      "purchase_price": 450000,
      "down_payment_percentage": 20,
      "interest_rate": 4.5,
      "loan_term": 30,
      "closing_costs": 13500,
      "renovation_budget": 5000,
      "monthly_rent": 2600,
      "other_income": 50,
      "vacancy_rate": 5,
      "property_tax_annual": 5000,
      "insurance_annual": 1200,
      "maintenance_percentage": 1,
      "property_management_percentage": 10,
      "utilities_monthly": 50,
      "hoa_monthly": 0,
      "capex_percentage": 5
    },
    "results": {
      "investment": {
        "purchase_price": 450000,
        "closing_costs": 13500,
        "renovation_budget": 5000,
        "total_investment": 468500,
        "down_payment": 90000,
        "loan_amount": 360000
      },
      "financing": {
        "loan_amount": 360000,
        "interest_rate": 4.5,
        "loan_term_years": 30,
        "monthly_payment": 1824,
        "total_payments": 656640,
        "total_interest": 296640
      },
      "income": {
        "monthly_rent": 2600,
        "other_income": 50,
        "gross_monthly_income": 2650,
        "vacancy_loss_monthly": 132.5,
        "effective_gross_income_monthly": 2517.5,
        "effective_gross_income_annual": 30210
      },
      "expenses": {
        "property_tax_monthly": 416.67,
        "insurance_monthly": 100,
        "maintenance_monthly": 375,
        "property_management_monthly": 265,
        "utilities_monthly": 50,
        "hoa_monthly": 0,
        "capex_reserve_monthly": 132.5,
        "total_expenses_monthly": 1339.17,
        "total_expenses_annual": 16070
      },
      "cash_flow": {
        "net_operating_income_monthly": 1178.33,
        "net_operating_income_annual": 14140,
        "monthly_cash_flow": -645.67,
        "annual_cash_flow": -7748,
        "debt_service_coverage_ratio": 0.65
      },
      "returns": {
        "cap_rate": 0.0314,
        "cash_on_cash_return": -0.0718,
        "total_roi_5year": 0.52,
        "annualized_roi_5year": 0.087,
        "internal_rate_of_return": 0.132
      },
      "projections": {
        "year_1": {
          "property_value": 468000,
          "equity": 108000,
          "annual_cash_flow": -7748,
          "cumulative_cash_flow": -7748
        },
        "year_5": {
          "property_value": 550000,
          "equity": 230000,
          "annual_cash_flow": -5200,
          "cumulative_cash_flow": -32000
        },
        "year_10": {
          "property_value": 650000,
          "equity": 380000,
          "annual_cash_flow": -2500,
          "cumulative_cash_flow": -55000
        }
      },
      "optimization_recommendations": [
        {
          "recommendation": "Increase rent",
          "target": 2800,
          "impact": {
            "monthly_cash_flow_change": 200,
            "cash_on_cash_return_change": 0.027
          }
        },
        {
          "recommendation": "Negotiate purchase price",
          "target": 435000,
          "impact": {
            "monthly_cash_flow_change": 75,
            "cash_on_cash_return_change": 0.01
          }
        },
        {
          "recommendation": "Refinance at lower rate",
          "target": 4.0,
          "impact": {
            "monthly_cash_flow_change": 96,
            "cash_on_cash_return_change": 0.013
          }
        }
      ]
    },
    "created_at": "2023-05-20T11:45:00Z"
  }
}
```

#### Run Sensitivity Analysis

Perform sensitivity analysis on financial parameters.

**Endpoint:** `/financial/sensitivity`

**Method:** POST

**Request:**

```json
{
  "property_id": "prop_12345",
  "base_parameters": {
    "purchase_price": 450000,
    "down_payment_percentage": 20,
    "interest_rate": 4.5,
    "monthly_rent": 2600
  },
  "sensitivity_parameters": [
    {
      "parameter": "purchase_price",
      "range": {
        "min": 425000,
        "max": 475000,
        "step": 5000
      }
    },
    {
      "parameter": "interest_rate",
      "range": {
        "min": 4.0,
        "max": 5.0,
        "step": 0.25
      }
    },
    {
      "parameter": "monthly_rent",
      "range": {
        "min": 2400,
        "max": 2800,
        "step": 100
      }
    }
  ],
  "output_metrics": ["monthly_cash_flow", "cash_on_cash_return", "cap_rate"]
}
```

**Response:**

```json
{
  "data": {
    "property_id": "prop_12345",
    "analysis_id": "sensitivity_12345",
    "base_parameters": {
      "purchase_price": 450000,
      "down_payment_percentage": 20,
      "interest_rate": 4.5,
      "monthly_rent": 2600
    },
    "results": {
      "purchase_price": {
        "parameter_values": [425000, 430000, 435000, 440000, 445000, 450000, 455000, 460000, 465000, 470000, 475000],
        "monthly_cash_flow": [-545.67, -565.67, -585.67, -605.67, -625.67, -645.67, -665.67, -685.67, -705.67, -725.67, -745.67],
        "cash_on_cash_return": [-0.0618, -0.0638, -0.0658, -0.0678, -0.0698, -0.0718, -0.0738, -0.0758, -0.0778, -0.0798, -0.0818],
        "cap_rate": [0.0334, 0.0329, 0.0324, 0.0319, 0.0316, 0.0314, 0.0311, 0.0308, 0.0305, 0.0302, 0.0299]
      },
      "interest_rate": {
        "parameter_values": [4.0, 4.25, 4.5, 4.75, 5.0],
        "monthly_cash_flow": [-549.67, -597.67, -645.67, -694.67, -743.67],
        "cash_on_cash_return": [-0.0622, -0.0670, -0.0718, -0.0767, -0.0816],
        "cap_rate": [0.0314, 0.0314, 0.0314, 0.0314, 0.0314]
      },
      "monthly_rent": {
        "parameter_values": [2400, 2500, 2600, 2700, 2800],
        "monthly_cash_flow": [-845.67, -745.67, -645.67, -545.67, -445.67],
        "cash_on_cash_return": [-0.0918, -0.0818, -0.0718, -0.0618, -0.0518],
        "cap_rate": [0.0294, 0.0304, 0.0314, 0.0324, 0.0334]
      }
    },
    "breakeven_points": {
      "monthly_rent_for_zero_cash_flow": 3045.67,
      "purchase_price_for_zero_cash_flow": 350000,
      "interest_rate_for_zero_cash_flow": 2.8
    },
    "created_at": "2023-05-20T12:30:00Z"
  }
}
```

#### Compare Properties

Compare financial metrics across multiple properties.

**Endpoint:** `/financial/compare`

**Method:** POST

**Request:**

```json
{
  "property_ids": ["prop_12345", "prop_23456", "prop_34567"],
  "metrics": ["purchase_price", "cap_rate", "cash_flow", "cash_on_cash_return", "five_year_roi", "risk_score", "ai_score"]
}
```

**Response:**

```json
{
  "data": {
    "comparison_id": "comparison_12345",
    "properties": [
      {
        "property_id": "prop_12345",
        "address": "123 Main St, Anytown, CA 90210",
        "metrics": {
          "purchase_price": 450000,
          "cap_rate": 0.036,
          "cash_flow": -468,
          "cash_on_cash_return": -0.052,
          "five_year_roi": 0.674,
          "risk_score": 2.1,
          "ai_score": 94
        }
      },
      {
        "property_id": "prop_23456",
        "address": "456 Oak Ave, Anytown, CA 90210",
        "metrics": {
          "purchase_price": 325000,
          "cap_rate": 0.042,
          "cash_flow": 125,
          "cash_on_cash_return": 0.023,
          "five_year_roi": 0.723,
          "risk_score": 3.4,
          "ai_score": 91
        }
      },
      {
        "property_id": "prop_34567",
        "address": "789 Pine St, Anytown, CA 90210",
        "metrics": {
          "purchase_price": 550000,
          "cap_rate": 0.051,
          "cash_flow": 320,
          "cash_on_cash_return": 0.035,
          "five_year_roi": 0.845,
          "risk_score": 3.8,
          "ai_score": 88
        }
      }
    ],
    "ranking": {
      "overall": ["prop_34567", "prop_23456", "prop_12345"],
      "by_metric": {
        "cap_rate": ["prop_34567", "prop_23456", "prop_12345"],
        "cash_flow": ["prop_34567", "prop_23456", "prop_12345"],
        "cash_on_cash_return": ["prop_34567", "prop_23456", "prop_12345"],
        "five_year_roi": ["prop_34567", "prop_23456", "prop_12345"],
        "risk_score": ["prop_12345", "prop_23456", "prop_34567"],
        "ai_score": ["prop_12345", "prop_23456", "prop_34567"]
      }
    },
    "recommendation": {
      "best_overall": "prop_34567",
      "best_cash_flow": "prop_34567",
      "best_appreciation": "prop_34567",
      "lowest_risk": "prop_12345",
      "explanation": "Property 789 Pine St offers the best overall investment opportunity with strong cash flow and appreciation potential, though at a slightly higher risk level. Property 123 Main St has the lowest risk profile but negative cash flow. Property 456 Oak Ave offers a balanced option with positive cash flow and moderate risk."
    },
    "created_at": "2023-05-20T13:15:00Z"
  }
}
```

### AI Analysis

#### Get Property Valuation

Retrieve AI-generated property valuation.

**Endpoint:** `/ai/valuation/{property_id}`

**Method:** GET

**Path Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| property_id | string | Unique property identifier | Yes |

**Response:**

```json
{
  "data": {
    "property_id": "prop_12345",
    "valuation": {
      "estimated_value": 465000,
      "confidence_interval": {
        "low": 450000,
        "high": 480000
      },
      "valuation_methods": [
        {
          "method": "comparable_sales",
          "value": 470000,
          "weight": 0.6,
          "comparable_properties": [
            {
              "property_id": "prop_23456",
              "address": "456 Oak Ave, Anytown, CA 90210",
              "sale_price": 465000,
              "sale_date": "2023-03-15",
              "similarity_score": 0.92
            },
            {
              "property_id": "prop_34567",
              "address": "789 Pine St, Anytown, CA 90210",
              "sale_price": 475000,
              "sale_date": "2023-02-20",
              "similarity_score": 0.88
            },
            {
              "property_id": "prop_45678",
              "address": "101 Elm St, Anytown, CA 90210",
              "sale_price": 460000,
              "sale_date": "2023-04-05",
              "similarity_score": 0.85
            }
          ]
        },
        {
          "method": "hedonic_pricing",
          "value": 455000,
          "weight": 0.3,
          "key_factors": [
            {
              "factor": "square_footage",
              "contribution": 225000
            },
            {
              "factor": "location",
              "contribution": 125000
            },
            {
              "factor": "bedrooms",
              "contribution": 60000
            },
            {
              "factor": "bathrooms",
              "contribution": 45000
            }
          ]
        },
        {
          "method": "income_approach",
          "value": 475000,
          "weight": 0.1,
          "cap_rate": 0.055
        }
      ],
      "market_conditions": {
        "trend": "appreciating",
        "annual_appreciation_rate": 0.045,
        "days_on_market_avg": 28,
        "sale_to_list_ratio": 0.98
      }
    },
    "created_at": "2023-05-20T14:00:00Z"
  }
}
```

#### Predict Rent Growth

Get AI predictions for future rent growth.

**Endpoint:** `/ai/predict/rent-growth`

**Method:** POST

**Request:**

```json
{
  "property_id": "prop_12345",
  "prediction_period": {
    "start_date": "2023-06-01",
    "end_date": "2028-06-01"
  },
  "granularity": "yearly"
}
```

**Response:**

```json
{
  "data": {
    "property_id": "prop_12345",
    "prediction_id": "prediction_12345",
    "current_rent": 2600,
    "predictions": {
      "yearly": [
        {
          "date": "2024-06-01",
          "predicted_rent": 2691,
          "growth_rate": 0.035,
          "confidence_interval": {
            "low": 2630,
            "high": 2752
          }
        },
        {
          "date": "2025-06-01",
          "predicted_rent": 2785,
          "growth_rate": 0.035,
          "confidence_interval": {
            "low": 2690,
            "high": 2880
          }
        },
        {
          "date": "2026-06-01",
          "predicted_rent": 2883,
          "growth_rate": 0.035,
          "confidence_interval": {
            "low": 2750,
            "high": 3016
          }
        },
        {
          "date": "2027-06-01",
          "predicted_rent": 2984,
          "growth_rate": 0.035,
          "confidence_interval": {
            "low": 2810,
            "high": 3158
          }
        },
        {
          "date": "2028-06-01",
          "predicted_rent": 3088,
          "growth_rate": 0.035,
          "confidence_interval": {
            "low": 2870,
            "high": 3306
          }
        }
      ]
    },
    "factors_influencing_prediction": [
      {
        "factor": "local_economic_growth",
        "impact": "positive",
        "weight": 0.35,
        "description": "Strong job growth in the area is driving rental demand"
      },
      {
        "factor": "housing_supply",
        "impact": "positive",
        "weight": 0.25,
        "description": "Limited new construction in the neighborhood"
      },
      {
        "factor": "population_growth",
        "impact": "positive",
        "weight": 0.2,
        "description": "Steady population increase in the metro area"
      },
      {
        "factor": "interest_rates",
        "impact": "negative",
        "weight": 0.1,
        "description": "Projected interest rate increases may slow overall market"
      },
      {
        "factor": "property_age",
        "impact": "negative",
        "weight": 0.1,
        "description": "Aging property may limit rent growth compared to newer properties"
      }
    ],
    "model_confidence": "high",
    "created_at": "2023-05-20T14:30:00Z"
  }
}
```

#### Assess Investment Risk

Get AI risk assessment for an investment property.

**Endpoint:** `/ai/risk-assessment`

**Method:** POST

**Request:**

```json
{
  "property_id": "prop_12345",
  "investment_parameters": {
    "holding_period": 5,
    "exit_cap_rate": 0.06,
    "annual_appreciation_assumption": 0.03,
    "annual_rent_growth_assumption": 0.035
  }
}
```

**Response:**

```json
{
  "data": {
    "property_id": "prop_12345",
    "assessment_id": "risk_12345",
    "overall_risk": {
      "score": 2.1,
      "level": "low",
      "description": "This property presents a relatively low overall investment risk based on the combined assessment of property, market, financial, and natural hazard factors."
    },
    "risk_categories": {
      "property_risk": {
        "score": 1.8,
        "level": "low",
        "factors": [
          {
            "factor": "property_condition",
            "score": 1.5,
            "level": "low",
            "description": "Good condition with recent updates"
          },
          {
            "factor": "property_age",
            "score": 2.5,
            "level": "low-medium",
            "description": "Built in 1985, some systems may need updates"
          },
          {
            "factor": "maintenance_requirements",
            "score": 1.7,
            "level": "low",
            "description": "Well-maintained with low projected maintenance needs"
          },
          {
            "factor": "tenant_quality",
            "score": 1.5,
            "level": "low",
            "description": "Area attracts stable, long-term tenants"
          }
        ]
      },
      "market_risk": {
        "score": 1.9,
        "level": "low",
        "factors": [
          {
            "factor": "market_stability",
            "score": 1.7,
            "level": "low",
            "description": "Stable market with consistent growth"
          },
          {
            "factor": "demand_supply",
            "score": 2.1,
            "level": "low-medium",
            "description": "Slightly more demand than supply"
          },
          {
            "factor": "economic_diversity",
            "score": 1.8,
            "level": "low",
            "description": "Diverse local economy not dependent on single industry"
          },
          {
            "factor": "rental_demand",
            "score": 1.5,
            "level": "low",
            "description": "Strong rental demand in the area"
          },
          {
            "factor": "neighborhood_trajectory",
            "score": 2.3,
            "level": "low-medium",
            "description": "Stable neighborhood with some signs of improvement"
          }
        ]
      },
      "financial_risk": {
        "score": 3.2,
        "level": "medium",
        "factors": [
          {
            "factor": "cash_flow",
            "score": 4.5,
            "level": "high",
            "description": "Negative cash flow is a concern"
          },
          {
            "factor": "debt_coverage",
            "score": 3.8,
            "level": "medium-high",
            "description": "DSCR below 1.0 indicates risk"
          },
          {
            "factor": "leverage",
            "score": 2.5,
            "level": "low-medium",
            "description": "20% down payment provides reasonable equity buffer"
          },
          {
            "factor": "interest_rate_risk",
            "score": 2.8,
            "level": "medium",
            "description": "Fixed-rate financing mitigates short-term risk"
          },
          {
            "factor": "exit_strategy",
            "score": 2.5,
            "level": "low-medium",
            "description": "Multiple viable exit options available"
          }
        ]
      },
      "natural_hazard_risk": {
        "score": 1.5,
        "level": "low",
        "factors": [
          {
            "factor": "flood_risk",
            "score": 1.2,
            "level": "low",
            "description": "Property not in flood zone"
          },
          {
            "factor": "wildfire_risk",
            "score": 1.8,
            "level": "low",
            "description": "Low wildfire risk area"
          },
          {
            "factor": "earthquake_risk",
            "score": 2.0,
            "level": "low-medium",
            "description": "Moderate seismic zone, but property built to code"
          },
          {
            "factor": "hurricane_risk",
            "score": 1.0,
            "level": "very low",
            "description": "Not in hurricane-prone region"
          }
        ]
      }
    },
    "scenario_analysis": {
      "base_case": {
        "total_return": 0.674,
        "annualized_return": 0.108,
        "final_property_value": 521000,
        "total_cash_flow": -28080
      },
      "best_case": {
        "total_return": 0.95,
        "annualized_return": 0.143,
        "final_property_value": 550000,
        "total_cash_flow": -15000,
        "probability": 0.25
      },
      "worst_case": {
        "total_return": 0.35,
        "annualized_return": 0.062,
        "final_property_value": 490000,
        "total_cash_flow": -40000,
        "probability": 0.15
      }
    },
    "risk_mitigation_recommendations": [
      {
        "recommendation": "Increase rent to improve cash flow",
        "impact": "Reduces financial risk score by 1.2 points"
      },
      {
        "recommendation": "Set aside additional reserves for capital expenditures",
        "impact": "Reduces property risk score by 0.5 points"
      },
      {
        "recommendation": "Consider refinancing to lower interest rate",
        "impact": "Reduces financial risk score by 0.8 points"
      }
    ],
    "created_at": "2023-05-20T15:00:00Z"
  }
}
```

#### Detect Investment Opportunities

Identify potential investment opportunities based on AI analysis.

**Endpoint:** `/ai/opportunities`

**Method:** POST

**Request:**

```json
{
  "investment_criteria": {
    "location": {
      "city": "Anytown",
      "state": "CA",
      "radius_miles": 10
    },
    "property_types": ["single_family", "multi_family"],
    "price_range": {
      "min": 300000,
      "max": 600000
    },
    "min_cap_rate": 0.05,
    "min_cash_flow": 0,
    "max_risk_score": 4,
    "investment_strategy": "cash_flow"
  },
  "limit": 5
}
```

**Response:**

```json
{
  "data": {
    "opportunities": [
      {
        "property_id": "prop_34567",
        "address": "789 Pine St, Anytown, CA 90210",
        "property_type": "single_family",
        "price": 550000,
        "match_score": 88,
        "key_metrics": {
          "cap_rate": 0.051,
          "cash_flow": 320,
          "cash_on_cash_return": 0.035,
          "risk_score": 3.8
        },
        "opportunity_factors": [
          "Strong cash flow potential",
          "Below market value by approximately 5%",
          "High-demand rental area"
        ]
      },
      {
        "property_id": "prop_45678",
        "address": "101 Elm St, Anytown, CA 90210",
        "property_type": "multi_family",
        "price": 425000,
        "match_score": 85,
        "key_metrics": {
          "cap_rate": 0.062,
          "cash_flow": 450,
          "cash_on_cash_return": 0.051,
          "risk_score": 3.5
        },
        "opportunity_factors": [
          "Excellent cash flow potential",
          "Recently renovated property",
          "Stable tenant history"
        ]
      },
      {
        "property_id": "prop_56789",
        "address": "202 Maple Ave, Anytown, CA 90210",
        "property_type": "single_family",
        "price": 380000,
        "match_score": 82,
        "key_metrics": {
          "cap_rate": 0.055,
          "cash_flow": 250,
          "cash_on_cash_return": 0.039,
          "risk_score": 2.9
        },
        "opportunity_factors": [
          "Good balance of cash flow and appreciation potential",
          "Low risk profile",
          "Improving neighborhood"
        ]
      },
      {
        "property_id": "prop_67890",
        "address": "303 Cedar Blvd, Anytown, CA 90210",
        "property_type": "multi_family",
        "price": 520000,
        "match_score": 79,
        "key_metrics": {
          "cap_rate": 0.053,
          "cash_flow": 280,
          "cash_on_cash_return": 0.032,
          "risk_score": 3.2
        },
        "opportunity_factors": [
          "Value-add opportunity through unit renovations",
          "Below-market rents with upside potential",
          "Strong rental demand in area"
        ]
      },
      {
        "property_id": "prop_78901",
        "address": "404 Birch St, Anytown, CA 90210",
        "property_type": "single_family",
        "price": 410000,
        "match_score": 76,
        "key_metrics": {
          "cap_rate": 0.05,
          "cash_flow": 150,
          "cash_on_cash_return": 0.022,
          "risk_score": 2.7
        },
        "opportunity_factors": [
          "Low risk investment",
          "Potential for significant appreciation",
          "Minimal maintenance required"
        ]
      }
    ],
    "market_insights": {
      "average_cap_rate": 0.048,
      "average_cash_flow": 180,
      "average_risk_score": 3.5,
      "trending_neighborhoods": [
        {
          "name": "West End",
          "appreciation_forecast": 0.055,
          "opportunity_factors": [
            "Planned infrastructure improvements",
            "New commercial development"
          ]
        },
        {
          "name": "North Side",
          "appreciation_forecast": 0.048,
          "opportunity_factors": [
            "Improving school district",
            "Increasing rental demand"
          ]
        }
      ]
    },
    "created_at": "2023-05-20T15:30:00Z"
  }
}
```

### Portfolio Management

#### Get Portfolio Summary

Retrieve summary information about an investment portfolio.

**Endpoint:** `/portfolio/{portfolio_id}/summary`

**Method:** GET

**Path Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| portfolio_id | string | Unique portfolio identifier | Yes |

**Response:**

```json
{
  "data": {
    "portfolio_id": "portfolio_12345",
    "name": "Primary Investment Portfolio",
    "summary": {
      "total_properties": 8,
      "total_value": 3200000,
      "total_equity": 1100000,
      "total_debt": 2100000,
      "monthly_cash_flow": 4850,
      "annual_cash_flow": 58200,
      "average_metrics": {
        "cap_rate": 0.058,
        "cash_on_cash_return": 0.062,
        "roi": 0.145,
        "annualized_roi": 0.087
      },
      "risk_profile": {
        "overall_risk_score": 2.8,
        "risk_level": "low-medium"
      }
    },
    "composition": {
      "by_property_type": {
        "single_family": {
          "count": 4,
          "percentage": 50,
          "value": 1600000
        },
        "multi_family": {
          "count": 3,
          "percentage": 37.5,
          "value": 1200000
        },
        "commercial": {
          "count": 1,
          "percentage": 12.5,
          "value": 400000
        }
      },
      "by_location": {
        "Downtown": {
          "count": 2,
          "percentage": 25,
          "value": 800000
        },
        "North Side": {
          "count": 3,
          "percentage": 37.5,
          "value": 1200000
        },
        "West End": {
          "count": 2,
          "percentage": 25,
          "value": 800000
        },
        "South Side": {
          "count": 1,
          "percentage": 12.5,
          "value": 400000
        }
      }
    },
    "performance": {
      "total_return": 0.145,
      "cash_flow_return": 0.053,
      "appreciation_return": 0.092,
      "benchmark_comparison": {
        "benchmark": "S&P 500",
        "benchmark_return": 0.087,
        "outperformance": 0.058
      },
      "historical": {
        "one_year": {
          "total_return": 0.145,
          "cash_flow_return": 0.053,
          "appreciation_return": 0.092
        },
        "three_year": {
          "total_return": 0.385,
          "cash_flow_return": 0.155,
          "appreciation_return": 0.23
        },
        "five_year": {
          "total_return": 0.72,
          "cash_flow_return": 0.27,
          "appreciation_return": 0.45
        }
      }
    },
    "created_at": "2023-05-20T16:00:00Z",
    "updated_at": "2023-05-20T16:00:00Z"
  }
}
```

#### Get Portfolio Properties

Retrieve all properties in a portfolio.

**Endpoint:** `/portfolio/{portfolio_id}/properties`

**Method:** GET

**Path Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| portfolio_id | string | Unique portfolio identifier | Yes |

**Query Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| limit | integer | Number of results per page (default: 20, max: 100) | No |
| offset | integer | Pagination offset | No |
| sort_by | string | Field to sort by (acquisition_date, value, cash_flow, roi) | No |
| sort_order | string | Sort order (asc, desc) | No |

**Response:**

```json
{
  "data": {
    "portfolio_id": "portfolio_12345",
    "properties": [
      {
        "property_id": "prop_12345",
        "address": "123 Main St, Anytown, CA 90210",
        "property_type": "single_family",
        "acquisition_date": "2022-05-15",
        "acquisition_price": 450000,
        "current_value": 485000,
        "appreciation": 0.078,
        "equity": 125000,
        "loan_balance": 360000,
        "monthly_cash_flow": -468,
        "annual_cash_flow": -5616,
        "cap_rate": 0.036,
        "cash_on_cash_return": -0.052,
        "total_roi": 0.065,
        "risk_score": 2.1
      },
      {
        "property_id": "prop_23456",
        "address": "456 Oak Ave, Anytown, CA 90210",
        "property_type": "single_family",
        "acquisition_date": "2022-08-10",
        "acquisition_price": 325000,
        "current_value": 345000,
        "appreciation": 0.062,
        "equity": 80000,
        "loan_balance": 265000,
        "monthly_cash_flow": 125,
        "annual_cash_flow": 1500,
        "cap_rate": 0.042,
        "cash_on_cash_return": 0.023,
        "total_roi": 0.087,
        "risk_score": 3.4
      },
      {
        "property_id": "prop_34567",
        "address": "789 Pine St, Anytown, CA 90210",
        "property_type": "multi_family",
        "acquisition_date": "2022-03-22",
        "acquisition_price": 550000,
        "current_value": 605000,
        "appreciation": 0.1,
        "equity": 165000,
        "loan_balance": 440000,
        "monthly_cash_flow": 320,
        "annual_cash_flow": 3840,
        "cap_rate": 0.051,
        "cash_on_cash_return": 0.035,
        "total_roi": 0.12,
        "risk_score": 3.8
      }
      // Additional properties...
    ],
    "pagination": {
      "total": 8,
      "limit": 20,
      "offset": 0
    },
    "created_at": "2023-05-20T16:30:00Z"
  }
}
```

#### Add Property to Portfolio

Add an existing property to a portfolio.

**Endpoint:** `/portfolio/{portfolio_id}/properties`

**Method:** POST

**Path Parameters:**

| Parameter | Type | Description | Required |
|-----------|------|-------------|---------|
| portfolio_id | string | Unique portfolio identifier | Yes |

**Request:**

```json
{
  "property_id": "prop_56789",
  "acquisition_date": "2023-05-01",
  "acquisition_price": 380000,
  "financing": {
    "down_payment": 76000,
    "loan_amount": 304000,
    "interest_rate": 4.25,
    "loan_term": 30,
    "monthly_payment": 1495
  },
  "notes": "Property acquired below market value. Needs minor cosmetic updates."
}
```

**Response:**

```json
{
  "data": {
    "portfolio_id": "portfolio_12345",
    "property_id": "prop_56789",
    "message": "Property successfully added to portfolio",
    "created_at": "2023-05-20T17:00:00Z"
  }
}
```