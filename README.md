Project Name: parking_lot
Prerequisites :
    internet on the deploy* machine to download the package depn* 
    you should have a non-root user account with sudo privileges set up on your system
Installation and run automation:
 
  1. unzip: tar -xvzf parking_lot-1.0.0.tgz -C parkinglot/
  get inside the "parkinglot/package/" DIR
  2. chmod +x setup.sh

Manual usage
Commands:

  parkinglot create_parking_lot  this will create a entire parking lot with n
                                 slots
  parkinglot park                park would allow checking avaiability for the
                                 slot and allocate the nearest slot.
  parkinglot leave               leave would help on exit process with apply
                                 charges & free up the slot in the end
  parkinglot status              Status will list the status of all the parking
                                 slots
  npm test                       to rerun the all tests   
  parkinglot --help              to see the underlying commands  

Issues
 -TODO
Uninstall Option
 -TODO 