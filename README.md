# vmware Work Sample Simulation

## Starting server in local ##
  1. npm i
  2. npm run dev:start
  
Valid end points-
   * get - http://localhost:5000/api/v1/menu/
   * post - http://localhost:5000/api/v1/menu/
   * put - http://localhost:5000/api/v1/menu/{:id}
    
    Sample request for post - {
      "name": "food1",
      "date": 1679128434520
    }
    
    Sample response for post - {
    "success": true,
        "menu": {
            "name": "food2",
            "date": "2023-03-18T08:33:54.520Z",
            "_id": "6415ab6c21044ea09c5038b0",
            "__v": 0
        }
    }
    
    Sample response for get - {
    "success": true,
        "menus": [
            {
                "_id": "6415ab5d21044ea09c5038ad",
                "name": "food1",
                "date": "2023-03-18T08:33:54.520Z",
                "__v": 0
            },
            {
                "_id": "6415ab6c21044ea09c5038b0",
                "name": "food2",
                "date": "2023-03-18T08:33:54.520Z",
                "__v": 0
            }
        ]
    }
    
#
    