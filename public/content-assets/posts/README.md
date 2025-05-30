# Media Directory

This directory contains images used in the content posts.

## Images for "Printing to Film Using DICOM Printer 2" Guide

The following SVG images have been created for the guide:

- `ceph-image-printed.svg` - An example of a dental X-ray printed with DICOM Printer 2, showing a logo at top left, patient info at top right, and clinic info at the bottom.
- `dicom-printer-config.svg` - A representation of the DICOM Printer 2 configuration interface.
- `print-dialog.svg` - A sample print dialog with DICOM Printer 2 selected.
- `film-size-selection.svg` - An illustration of the film size selection dropdown.

These SVG images provide clean, scalable illustrations of the DICOM Printer 2 interface and output for documentation purposes.

## Required Images

For the "Printing to Film Using DICOM Printer 2" guide, please add the following image:

- `ceph-image-printed.jpg` - An example of a dental X-ray printed with DICOM Printer 2, showing a logo at top left, patient info at top right, and clinic info at the bottom.

Please add appropriate images to ensure the content displays correctly.

---

# (Run these from your local project directory)

# 1. Add Dokku as a remote (if you haven't already)

# You can replace 'dokku' with any name you prefer for the remote, though 'dokku' is a common convention.

git remote add dokku dokku@dokku.fluxinc.co:pcjazzsociety

# 2. Push your code to deploy the application

# This command pushes your local 'main' branch to the 'master' branch on the Dokku remote.

# Dokku will then automatically build and deploy your project.

# If your local development branch is 'master':

git push dokku master:master

# If you want to push a different local branch (e.g., 'develop') to deploy:

# git push dokku develop:master

# 3. Forcing a push (use with caution)

# If you need to overwrite history on the Dokku remote (this is rarely needed and should be used carefully,

# as it can disrupt things if others are also working with the remote):

# git push --force dokku main:master
