with open('src/pages/Landing.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Simple string replace
old = '''               </motion.div>


            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR - Enhanced Responsive */}'''

new = '''               </motion.div>

              {/* Floating Popouts - Static (no animation for performance) */}
              <div className="hidden md:flex absolute -left-8 lg:-left-12 top-8 lg:top-20 bg-surface/80 backdrop-blur-lg border border-gold/30 rounded-lg p-3 shadow-gold items-center gap-3 z-10">
                <span className="text-2xl">**</span>
                <div>
                  <p className="font-semibold text-text-primary text-sm">14-Day Streak!</p>
                  <p className="text-xs text-text-secondary">Keep it up!</p>
                </div>
              </div>

              <div className="absolute -right-4 lg:-right-8 top-1/2 bg-surface/80 backdrop-blur-lg border border-success/30 rounded-lg p-3 shadow-lg flex items-center gap-3 z-10">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <Icon name="checkCircle" className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">Chemistry: 87%</p>
                  <p className="text-xs text-success">Result Released</p>
                </div>
              </div>

              <div className="absolute left-4 lg:left-8 -bottom-4 bg-surface/80 backdrop-blur-lg border border-primary/30 rounded-lg p-3 shadow-lg flex items-center gap-3 z-10">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="zap" className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">Quest Complete!</p>
                  <p className="text-xs text-gold">+250 coins</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR - Enhanced Responsive */}'''

if old in content:
    content = content.replace(old, new)
    with open('src/pages/Landing.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS: Updated Landing.tsx with static popouts')
else:
    print('Pattern not found exactly')
    # Show what we're looking for
    print('Looking for:', repr(old[:100]))
    print('In content at index 8562:', repr(content[8562:8562+100]))
    # Try with the exact content from the file
    idx = content.find('</motion.div>\n\n\n            </motion.div>')
    if idx >= 0:
        # Get the exact text from the file
        exact = content[idx:idx+250]
        print('Exact text from file:', repr(exact))
        # Use this exact text
        old_exact = exact[:exact.find('\n\n      {/* STATS BAR') + 2]
        print('Old exact:', repr(old_exact))
        # Replace
        content = content.replace(old_exact, new)
        with open('src/pages/Landing.tsx', 'w', encoding='utf-8') as f:
            f.write(content)
        print('SUCCESS: Updated via exact match')
    else:
        print('Could not find pattern')
