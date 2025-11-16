@echo off
echo ================================================
echo   Flowventory UML Diagram Generator
echo   TRANSFORMERS Team
echo ================================================
echo.

REM Set PlantUML JAR path (adjust this to where you downloaded plantuml.jar)
SET PLANTUML_JAR=c:\tools\plantuml.jar

REM Alternative paths (uncomment if needed)
REM SET PLANTUML_JAR=%USERPROFILE%\Downloads\plantuml.jar
REM SET PLANTUML_JAR=plantuml.jar

REM Check if PlantUML JAR exists
IF NOT EXIST "%PLANTUML_JAR%" (
    echo ERROR: PlantUML JAR not found at: %PLANTUML_JAR%
    echo.
    echo Please download PlantUML JAR from:
    echo https://github.com/plantuml/plantuml/releases
    echo.
    echo Download plantuml.jar and save it to: c:\tools\plantuml.jar
    echo Or update the PLANTUML_JAR variable in this script.
    echo.
    pause
    exit /b 1
)

REM Check if Java is installed
java -version >nul 2>&1
IF ERRORLEVEL 1 (
    echo ERROR: Java is not installed or not in PATH
    echo.
    echo Please install Java from:
    echo https://www.oracle.com/java/technologies/downloads/
    echo.
    pause
    exit /b 1
)

echo Java found:
java -version 2>&1 | findstr "version"
echo.
echo PlantUML JAR: %PLANTUML_JAR%
echo.

REM Generate diagrams
echo ------------------------------------------------
echo Generating Updated Class Diagram...
echo ------------------------------------------------
java -jar "%PLANTUML_JAR%" flowventory_updated_class_diagram.puml
IF ERRORLEVEL 1 (
    echo ERROR: Failed to generate class diagram
) ELSE (
    echo SUCCESS: flowventory_updated_class_diagram.png created
)
echo.

echo ------------------------------------------------
echo Generating Updated Use Case Diagram...
echo ------------------------------------------------
java -jar "%PLANTUML_JAR%" flowventory_updated_usecase_diagram.puml
IF ERRORLEVEL 1 (
    echo ERROR: Failed to generate use case diagram
) ELSE (
    echo SUCCESS: flowventory_updated_usecase_diagram.png created
)
echo.

echo ------------------------------------------------
echo Generating Updated Sequence Diagrams...
echo ------------------------------------------------
java -jar "%PLANTUML_JAR%" flowventory_updated_sequence_diagrams.puml
IF ERRORLEVEL 1 (
    echo ERROR: Failed to generate sequence diagrams
) ELSE (
    echo SUCCESS: flowventory_updated_sequence_diagrams.png created
)
echo.

echo ================================================
echo   Generation Complete!
echo ================================================
echo.
echo Generated files:
dir /b *.png | findstr "updated"
echo.
echo All PNG files have been created in the current directory.
echo.
pause
