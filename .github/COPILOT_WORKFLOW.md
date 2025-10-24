# GitHub Copilot Workflow Guide

This document explains how to effectively use GitHub Copilot when working on the Bridge 4 Flight Map project.

## 🤖 Getting Started with Copilot

### Prerequisites
- GitHub Copilot subscription (Individual, Business, or Enterprise)
- VS Code or compatible IDE with Copilot extension installed
- Repository cloned and set up (run `.github/copilot-setup.sh`)

### Initial Setup
1. Install GitHub Copilot extension in your IDE
2. Sign in with your GitHub account
3. Open the project folder
4. Copilot will read `.github/copilot-instructions.md` automatically

## 💡 Using Copilot Effectively

### Code Suggestions

#### Accepting Suggestions
- **Tab**: Accept the suggestion
- **Esc**: Dismiss the suggestion
- **Alt+]**: Next suggestion
- **Alt+[**: Previous suggestion

#### Getting Better Suggestions
```javascript
// ❌ Vague comment
// function to load data

// ✅ Specific comment
// Load GeoJSON data for Ontario crown land from the given URL
// Returns a promise that resolves to a FeatureCollection
async function loadCrownLandData(url) {
```

### Copilot Chat

#### Open Chat
- **Ctrl+Shift+I** (Windows/Linux)
- **Cmd+Shift+I** (Mac)
- Or click the chat icon in the sidebar

#### Effective Prompts

##### For New Components
```
Create a React component called FlightZoneCard that:
- Takes zone data as props (name, type, coordinates, restrictions)
- Uses Tailwind CSS with storm-blue color scheme
- Displays zone information in a card format
- Includes a "View on Map" button
- Follows the project's component patterns
```

##### For Refactoring
```
Refactor this component to:
- Use the useMapLayers hook for state management
- Follow React hooks best practices
- Add proper cleanup in useEffect
- Maintain existing functionality
```

##### For Bug Fixes
```
This function crashes when coordinates are null. Update it to:
- Validate inputs before processing
- Return appropriate error messages
- Handle edge cases gracefully
- Follow existing error handling patterns
```

##### For Documentation
```
Add JSDoc comments to this function that:
- Describe parameters and return values
- Include usage examples
- Note any edge cases or limitations
```

### Copilot Commands

Use `/` in chat to access commands:

#### `/explain`
```
/explain what does this useMapLayers hook do?
```
Explains code functionality in detail.

#### `/fix`
```
/fix the map layers aren't toggling correctly
```
Suggests fixes for issues.

#### `/tests`
```
/tests create unit tests for the dataLoader utility
```
Generates test cases.

#### `/doc`
```
/doc add documentation to the geoHelpers functions
```
Adds documentation to code.

#### `/simplify`
```
/simplify this component has too much logic
```
Refactors complex code.

## 🎯 Project-Specific Workflows

### Adding a New Component

1. **Create File**
   ```javascript
   // In src/components/NewComponent.jsx
   // Start typing and Copilot will suggest based on filename
   import React from 'react';
   ```

2. **Use Chat for Structure**
   ```
   Create a React component called NewComponent that:
   - Uses functional component with hooks
   - Takes props: [list props]
   - Renders [describe UI]
   - Uses Tailwind classes with storm-blue theme
   - Follows existing component patterns
   ```

3. **Add Styling**
   ```javascript
   // Type comment, let Copilot suggest Tailwind classes
   // Container with storm-blue background and padding
   <div className="bg-storm-blue p-4 rounded-lg shadow-lg">
   ```

4. **Test Component**
   ```javascript
   // Ask Copilot to create a test file
   // Create test file for NewComponent in src/components/__tests__/
   ```

### Working with Map Layers

1. **Adding New Layer Data**
   ```javascript
   // In src/utils/dataLoader.js
   // Add function to load [data source name] GeoJSON data
   // Should fetch from URL, validate structure, and return FeatureCollection
   ```

2. **Creating Layer Toggle**
   ```javascript
   // In src/components/Sidebar.jsx
   // Add toggle for [layer name] with storm-radiant color when active
   ```

3. **Styling Layer**
   ```javascript
   // In Map.jsx
   // Add GeoJSON layer for [layer name] with [color] styling
   // Include popup with [properties to display]
   ```

### Debugging with Copilot

#### Understanding Errors
```
/explain why am I getting "Cannot read property 'map' of undefined"?
```

#### Fixing Issues
```
This map layer isn't rendering. The data is loaded but nothing appears.
Check:
- GeoJSON structure
- Coordinate format (lat/lng vs lng/lat)
- Layer visibility settings
- Console for errors
```

#### Performance Issues
```
The map is slow when toggling layers with large datasets.
Suggest optimizations for:
- Rendering performance
- Data loading strategies
- Memory management
```

## 🏗️ Common Patterns

### React Hooks Pattern

```javascript
// When you type this comment, Copilot suggests the implementation
// Custom hook to manage flight zone filters
export function useFlightZoneFilters() {
  // Copilot will suggest:
  // - useState for filter state
  // - useEffect for side effects
  // - Helper functions
  // - Return object with state and functions
}
```

### Data Loading Pattern

```javascript
// Copilot understands the project pattern
// Load and validate GeoJSON data for [source name]
async function loadDataSource(url) {
  // Copilot suggests:
  // - try/catch error handling
  // - fetch with proper headers
  // - validation function call
  // - return processed data
}
```

### Component Pattern

```javascript
// Following project conventions
function MyComponent({ prop1, prop2 }) {
  // Copilot knows to suggest:
  // - Hooks at the top
  // - Event handlers
  // - Tailwind classes
  // - Proper JSX structure
  // - Return statement
}
```

## 📊 Best Practices

### Do's ✅

1. **Be Specific in Comments**
   ```javascript
   // ✅ Good: Load Ontario crown land GeoJSON, validate coordinates, handle errors
   // ❌ Bad: load data
   ```

2. **Provide Context**
   ```javascript
   // For the Bridge 4 Flight Map drone planning app
   // Create a component that shows legal flight zones in green
   ```

3. **Reference Existing Code**
   ```javascript
   // Similar to the Sidebar component, but for flight planning
   ```

4. **Use Type Information**
   ```javascript
   /**
    * @param {Array<{lat: number, lng: number}>} coordinates
    * @returns {Object} GeoJSON Feature
    */
   ```

5. **Iterate on Suggestions**
   - Accept suggestion
   - Refine if needed
   - Ask Copilot to improve

### Don'ts ❌

1. **Don't Accept Blindly**
   - Review all suggestions
   - Verify they match project patterns
   - Test thoroughly

2. **Don't Ignore Project Style**
   - Copilot might suggest different patterns
   - Adapt suggestions to match existing code
   - Use Tailwind, not inline styles

3. **Don't Skip Documentation**
   - Even with Copilot, document complex logic
   - Add JSDoc for functions
   - Update README for features

4. **Don't Forget Security**
   - Review API key handling
   - Validate user inputs
   - Check for XSS vulnerabilities

5. **Don't Commit Without Testing**
   - Run `npm run lint`
   - Run `npm run build`
   - Test in browser

## 🔍 Troubleshooting

### Copilot Not Suggesting?

1. **Check Extension Status**
   - Ensure Copilot extension is active
   - Check for updates
   - Restart IDE if needed

2. **Improve Context**
   - Add more specific comments
   - Include type information
   - Reference similar code

3. **File Context**
   - Ensure file has correct extension (.jsx, .js)
   - Check if file is too small (needs context)
   - Open related files for better suggestions

### Suggestions Not Matching Project?

1. **Review copilot-instructions.md**
   - Ensure it's in `.github/` folder
   - Check it describes patterns correctly
   - Update with new patterns

2. **Add Inline Context**
   ```javascript
   // Following Bridge 4 Flight Map patterns
   // Using storm-blue color scheme from tailwind.config.js
   ```

3. **Use Existing Code as Template**
   - Open similar components
   - Copilot learns from open files
   - Copy structure, let Copilot fill details

### Wrong Technology Suggestions?

If Copilot suggests Vue/Angular instead of React:

```javascript
// React component for Bridge 4 Flight Map (React 18 + Vite)
// Use functional component with hooks, not class component
```

## 🎓 Learning Mode

### Understand Before Accepting

```
/explain walk me through this suggested code step by step
```

### Alternative Approaches

```
What are alternative ways to implement this feature?
What are the pros and cons of each approach?
```

### Best Practices

```
Is this the best practice for React hooks?
How can I make this code more performant?
```

## 🚀 Advanced Techniques

### Multi-File Changes

1. Open all related files
2. Use Copilot Chat to plan changes
3. Apply changes one file at a time
4. Keep related files open for context

### Refactoring Sessions

```
I want to refactor the map layer system to be more maintainable.
Current structure: [describe]
Goal: [describe]
Constraints: [list]

Let's start with [specific file/component]
```

### Architecture Discussions

```
I'm adding flight path planning. How should I structure this?
Consider:
- State management
- Component hierarchy
- Data flow
- Integration with existing map
```

## 📈 Measuring Success

### Code Quality Indicators

- ✅ Follows project patterns
- ✅ Uses established hooks and utilities
- ✅ Properly styled with Tailwind
- ✅ Includes error handling
- ✅ Has appropriate documentation
- ✅ Passes linter
- ✅ Builds successfully

### Productivity Indicators

- ⚡ Faster component creation
- ⚡ Fewer syntax errors
- ⚡ Better documentation coverage
- ⚡ More consistent code style
- ⚡ Easier refactoring

## 🔗 Resources

### Official Documentation
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [Copilot Best Practices](https://gh.io/copilot-best-practices)

### Project Documentation
- `.github/copilot-instructions.md` - Project-specific guidance
- `CONTRIBUTING.md` - Contribution guidelines
- `ARCHITECTURE.md` - System architecture
- `README.md` - Project overview

### IDE Extensions
- GitHub Copilot
- GitHub Copilot Chat
- ESLint
- Prettier
- Tailwind CSS IntelliSense

## 💬 Getting Help

### In-IDE Help
```
How do I [specific task] in this project?
```

### Project-Specific Questions
```
Where should I add [new feature]?
What's the pattern for [specific functionality]?
```

### Debug Help
```
I'm getting [error message]. What's wrong?
```

---

**Remember**: Copilot is a tool to enhance your productivity, not replace your judgment. Always review, test, and understand the code it suggests.

**Life before death. Strength before weakness. Journey before destination.**

⚡ **Built with AI-assisted development** ⚡
