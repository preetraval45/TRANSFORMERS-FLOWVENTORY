# How to Generate UML Diagram Images

This guide explains how to generate PNG images from the PlantUML (.puml) files.

---

## Prerequisites

1. **Java** - Already installed on your system at `C:\Program Files\Common Files\Oracle\Java\javapath\java.exe`
2. **PlantUML JAR file** - Download from https://plantuml.com/download

---

## Method 1: Using PlantUML JAR (Recommended)

### Step 1: Download PlantUML JAR

```bash
# Download PlantUML JAR file
# Visit: https://github.com/plantuml/plantuml/releases
# Download: plantuml.jar (latest version)
# Save to: c:\tools\plantuml.jar (or any location you prefer)
```

### Step 2: Generate All Diagrams

Open Command Prompt or PowerShell in the UML directory:

```bash
cd "c:\Users\raval\OneDrive - University of North Carolina at Charlotte\Documents\GitHub\TRANSFORMERS-FLOWVENTORY\Documentation\uml"
```

Generate all PNG images:

```bash
java -jar c:\tools\plantuml.jar *.puml
```

Or generate individual diagrams:

```bash
# Class Diagram
java -jar c:\tools\plantuml.jar flowventory_updated_class_diagram.puml

# Use Case Diagram
java -jar c:\tools\plantuml.jar flowventory_updated_usecase_diagram.puml

# Sequence Diagrams
java -jar c:\tools\plantuml.jar flowventory_updated_sequence_diagrams.puml
```

### Step 3: Verify Output

The command will generate PNG files with the same name:
- `flowventory_updated_class_diagram.png`
- `flowventory_updated_usecase_diagram.png`
- `flowventory_updated_sequence_diagrams.png` (contains all 12 sequence diagrams)

---

## Method 2: Using Online PlantUML Editor

### Step 1: Open PlantUML Online Editor

Visit: https://www.plantuml.com/plantuml/uml/

### Step 2: Copy PUML Content

1. Open one of the .puml files (e.g., `flowventory_updated_class_diagram.puml`)
2. Copy all the content
3. Paste into the online editor

### Step 3: Download Image

1. The diagram will render automatically
2. Click the "PNG" button to download
3. Save with appropriate name

Repeat for all three updated diagrams.

---

## Method 3: Using VS Code Extension

### Step 1: Install Extension

1. Open VS Code
2. Install "PlantUML" extension by jebbs
3. Reload VS Code

### Step 2: Preview and Export

1. Open any .puml file
2. Press `Alt + D` to preview
3. Right-click on preview → Export diagrams
4. Choose PNG format
5. Save to desired location

---

## Quick Generation Script (Windows)

Save this as `generate_uml.bat` in the uml folder:

```batch
@echo off
echo Generating UML Diagrams...

REM Set PlantUML JAR path
SET PLANTUML_JAR=c:\tools\plantuml.jar

REM Check if PlantUML JAR exists
IF NOT EXIST "%PLANTUML_JAR%" (
    echo ERROR: PlantUML JAR not found at %PLANTUML_JAR%
    echo Please download from https://plantuml.com/download
    pause
    exit /b 1
)

REM Generate diagrams
echo.
echo Generating Class Diagram...
java -jar "%PLANTUML_JAR%" flowventory_updated_class_diagram.puml

echo.
echo Generating Use Case Diagram...
java -jar "%PLANTUML_JAR%" flowventory_updated_usecase_diagram.puml

echo.
echo Generating Sequence Diagrams...
java -jar "%PLANTUML_JAR%" flowventory_updated_sequence_diagrams.puml

echo.
echo Done! PNG files generated successfully.
pause
```

Then run:
```bash
cd "c:\Users\raval\OneDrive - University of North Carolina at Charlotte\Documents\GitHub\TRANSFORMERS-FLOWVENTORY\Documentation\uml"
generate_uml.bat
```

---

## Alternative: Using GraphViz (Optional)

For better rendering quality, install GraphViz:

1. Download from: https://graphviz.org/download/
2. Install GraphViz
3. Add to PATH: `C:\Program Files\Graphviz\bin`
4. Run PlantUML with GraphViz support

---

## Output Files

After generation, you should have:

```
Documentation/uml/
├── flowventory_updated_class_diagram.puml
├── flowventory_updated_class_diagram.png          ← Generated
├── flowventory_updated_usecase_diagram.puml
├── flowventory_updated_usecase_diagram.png        ← Generated
├── flowventory_updated_sequence_diagrams.puml
└── flowventory_updated_sequence_diagrams.png      ← Generated (all 12 diagrams)
```

---

## Troubleshooting

### Issue: "java: command not found"
**Solution:** Add Java to PATH or use full path:
```bash
"C:\Program Files\Common Files\Oracle\Java\javapath\java.exe" -jar c:\tools\plantuml.jar *.puml
```

### Issue: "Error reading file"
**Solution:** Ensure you're in the correct directory:
```bash
cd "c:\Users\raval\OneDrive - University of North Carolina at Charlotte\Documents\GitHub\TRANSFORMERS-FLOWVENTORY\Documentation\uml"
```

### Issue: "GraphViz dot executable not found"
**Solution:** This is a warning, not an error. Diagrams will still generate. For better quality, install GraphViz.

### Issue: Diagram is too large
**Solution:** Add scale factor to PUML file:
```plantuml
@startuml
scale 0.8
...
@enduml
```

---

## File Descriptions

### Updated Diagrams (Phase 4)

| File | Description | Elements |
|------|-------------|----------|
| `flowventory_updated_class_diagram.puml` | Complete class diagram with entities, schemas, routers, and React components | 5 entities, 5 schemas, 5 routers, 5 components |
| `flowventory_updated_usecase_diagram.puml` | Use cases with normal and error flows for all modules | 37 use cases, 4 actors, 9 modules |
| `flowventory_updated_sequence_diagrams.puml` | Sequence diagrams for key workflows (normal + error flows) | 12 diagrams total |

---

## Quick Reference Commands

```bash
# Navigate to UML directory
cd "c:\Users\raval\OneDrive - University of North Carolina at Charlotte\Documents\GitHub\TRANSFORMERS-FLOWVENTORY\Documentation\uml"

# Generate all diagrams
java -jar c:\tools\plantuml.jar *.puml

# Generate specific diagram
java -jar c:\tools\plantuml.jar flowventory_updated_class_diagram.puml

# Generate with specific output format
java -jar c:\tools\plantuml.jar -tpng flowventory_updated_class_diagram.puml

# Generate SVG instead of PNG
java -jar c:\tools\plantuml.jar -tsvg flowventory_updated_class_diagram.puml
```

---

For more information, visit: https://plantuml.com/guide
