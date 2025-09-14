import { Project } from "../types/project";

// Single project that will be dynamically loaded from the API
export const currentProject: Project = {
  id: "bookcase",
  title: "3 Shelf Bookcase White - Room Essentials",
  description:
    "Assemble a functional 3-shelf bookcase for organizing your space.",
  difficulty: "Beginner",
  totalTime: "1-2 hours",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGJvb2tjYXNlJTIwc2hlbGZ8ZW58MXx8fHwxNzU3NzkxNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  steps: [
    {
      id: 1,
      title: "Assemble side panels",
      description: "Attach the side panels to the top and bottom shelves.",
      instructions: [
        "Align side panels with shelves",
        "Insert cam locks and screws",
        "Tighten cam locks securely",
        "Ensure side panels are flush with the shelves",
      ],
      imageUrl:
        "https://hackmit25.s3.amazonaws.com/projects/492490502940-step-1.jpg",
      estimatedTime: "20 minutes",
      materials: ["Side panels", "Top shelf", "Bottom shelf", "Cam locks", "Screws"],
      tools: ["Screwdriver", "Allen wrench"],
    },
    {
      id: 2,
      title: "Attach middle shelf",
      description: "Connect the middle shelf to the side panels.",
      instructions: [
        "Align middle shelf with side panels",
        "Insert cam locks and screws",
        "Tighten cam locks",
        "Make sure middle shelf is level",
      ],
      imageUrl:
        "https://hackmit25.s3.amazonaws.com/projects/492490502940-step-2.jpg",
      estimatedTime: "15 minutes",
      materials: ["Middle shelf", "Cam locks", "Screws"],
      tools: ["Screwdriver", "Level"],
    },
    {
      id: 3,
      title: "Install back panel",
      description: "Secure the back panel to the assembled bookcase.",
      instructions: [
        "Position back panel on the bookcase",
        "Attach with screws",
        "Ensure back panel is flush",
        "Carefully align back panel before screwing in",
      ],
      imageUrl:
        "https://hackmit25.s3.amazonaws.com/projects/492490502940-step-3.jpg",
      estimatedTime: "20 minutes",
      materials: ["Back panel", "Screws"],
      tools: ["Screwdriver", "Measuring tape"],
    },
    {
      id: 4,
      title: "Attach levelers",
      description: "Install the leveling feet on the bottom of the bookcase.",
      instructions: [
        "Screw levelers into the bottom of the side panels",
        "Adjust levelers as needed for stability",
        "Level the bookcase on uneven floors",
      ],
      imageUrl:
        "https://hackmit25.s3.amazonaws.com/projects/492490502940-step-4.jpg",
      estimatedTime: "10 minutes",
      materials: ["Leveling feet"],
      tools: ["Screwdriver"],
    },
    {
      id: 5,
      title: "Secure bookcase to wall",
      description:
        "Attach the bookcase to the wall to prevent tipping.",
      instructions: [
        "Locate wall stud locations",
        "Drill pilot holes",
        "Insert wall anchor screws",
        "Use wall anchors for drywall installations",
      ],
      imageUrl:
        "https://hackmit25.s3.amazonaws.com/projects/492490502940-step-5.jpg",
      estimatedTime: "15 minutes",
      materials: ["Wall anchors", "Screws"],
      tools: ["Drill", "Stud finder", "Screwdriver"],
    },
  ],
};