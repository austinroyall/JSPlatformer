var GAME_LEVELS = [
  ["                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                                ",
   "                                                                              x ",
   "                                                                            o x ",
   "                                                                              x ",
   "  x         x  x xxxx x   xx   xxxx xxxx   xxx  xxx xxxx                      x ",
   "  x         x  x x  x x   x x  x    x   x x   x x   x                     xxxxx ",
   "  x         xxxx x  x x   x x  xxxx xxxx  xxxxx x   xxx                   xxxxx ",
   "  x         x  x x  x x   x x     x x     x   x x   x                     xxxxx ",
   "  x         x  x xxxx xxx xx   xxxx x     x   x xxx xxxx                  xxxxx ",
   "  x                                                                           x ",
   "  x  @                                                                        x ",
   "  xxxxx              o       o          o         o          o                x ",
   "      x                                                                       x ",
   "      x                                                               B       x ",
   "      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    x ",
   "                                                                         x!!!!x ",
   "                                                                         xxxxxx ",
   "                                                                                "],
  ["                                                                                                                  ",
   "                                                                                                                  ",
   "                                                                                                                  ",
   "                                                                 o   o                                            ",
   "                                                                                                                  ",
   "                                                                                                                  ",
   "                                                                xxxxxxxx                                          ",
   "                                                                                                                  ",
   "                                                                                                                  ",
   "                                                                                                                  ",
   "                                            o               B                                                     ",
   "                                                                                                                  ",
   "                                                                                                                  ",
   "                                     xx    xxxx                                                                   ",
   "                                                                                                                  ",
   "                       o                                                                                          ",
   "                                                                                                                  ",
   "                                                       B                                                          ",
   "                      xxxxx                                                                                       ",
   "                                                                                                                  ",
   "                                                                                                                  ",
   "                                                                                                                  ",
   "                               B                                                                                  ",
   "        xxxx   xxxx                                                     o                   o                     ",
   "                                                                                                                  ",
   "   @                                                                                                              ",
   "                                                                       xxxxx       x       xxxx                   ",
   "  xxxx                                                                                                            ",
   "                    B                                                                                             ",
   "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"],
  ["                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                    o    o    o    o                          ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                   xxxxxxxxxxxxxxxxxx                         ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                B                                             ",
   "                                                                                                              ",
   "                                                            8                                                 ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                       8                                                      ",
   "                             o                                                                                ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                            xxxx                  8                                                           ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                        8                B                                                                    ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                    8                                                                                         ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "   @   o                                                                                                      ",
   "             8                                                                                                ",
   "                                                                                                              ",
   "xxxxxxxxxx                                                                                                    ",
   "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
   "                                                                                                              "],
  ["                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                          !      x                                            ",
   "                                                          x      x                                            ",
   "                                                          x      x                                            ",
   "                                                          x      <x                                           ",
   "                                                        B x      x                                            ",
   "                                                          x      x                                            ",
   "                                                          x      <x                                           ",
   "                                                          x      x                                            ",
   "                                                          x      x                                            ",
   "                                                          x      <x                                           ",
   "                                                          x      x                                            ",
   "                                                          x      x                                            ",
   "                                                          x      x                                            ",
   "                                                          x      x                                            ",
   "                                                          xo     x                                            ",
   "                                    o     o         B     x      x                                            ",
   "                                                          xxxx   x                                            ",
   "                                                                                                              ",
   "                                   xxxxxxxxxxx                                                                ",
   "                                        m                                                                     ",
   "    @                                                                                                         ",
   "                      o                                                 o          o                          ",
   "                              8                                                                               ",
   "                                                                                                              ",
   "xxxxxxxxxxx         xxxxx                                      x       xxxxx      xxxx                        ",
   "             m                                                                                                ",
   "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"],
   ["                                                                                                              ",
   "                                                                                                              ",
   "                                                     o                                                        ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "                                                                                                              ",
   "x                                                                                                            x",
   "x                                                                                                            x",
   "x                                                                                                            x",
   "x                                                                                                            x",
   "x                                                                                                            x",
   "x                           x   x xxxx x  x    x     x xxxxx xx    x                                         x",
   "x                            x x  x  x x  x    x     x   x   x x   x                                         x",
   "x                             x   x  x x  x    x  x  x   x   x  x  x                                         x",
   "x                             x   x  x x  x    x x x x   x   x   x x                                         x",
   "x                             x   xxxx xxxx    xx   xx xxxxx x    xx                                         x",
   "x                                                                                                            x",
   "x                                                                                                            x",
   "x                                                                                                            x",
   "x                                           @                                                                x",
   "x                                                                                                            x",
   "x                                                                                                            x",
   "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"]
];

if (typeof module != "undefined" && module.exports)
  module.exports = GAME_LEVELS;
