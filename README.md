
---

## Functional Deliverables
1. **Staging Environment**: The application is deployed and tested in a staging environment.  
   [https://shop-co-teal.vercel.app/](#)  

2. **Key Features**:
   - Product Listing Page
   - Individual Product Detail Pages
   - Category Filters and Search Bar
   - Pagination for Product List
   - Fully Responsive Design

---

## Deployment Steps
1. Set up the project locally using `npm install` and `npm run dev`.
2. Configure Sanity CMS keys in the `.env` file.
3. Deploy the application on **Vercel**.

---

## Documentation Highlights
### 1. Dynamic Components
- **Product Listing**: Fetches data dynamically from Sanity CMS.
- **Routing**: Uses Next.js file-based dynamic routing for product details.

### 2. Performance Optimization
- Images are optimized with Next.js Image component.
- Lighthouse and GTmetrix were used to improve performance scores.

---

## Test Cases
The detailed test cases are provided in the `documents/test_cases.csv` file.

---

## Performance Testing Results
Performance test reports are included in the `documents/` folder. Results highlight:
- First Contentful Paint: 0.9s
- Speed Index: 1.2s

---

## Challenges Faced
1. **API Integration Issues**: Resolved API key configuration errors.
2. **Dynamic Routing**: Fixed issues with incorrect slugs causing page crashes.
