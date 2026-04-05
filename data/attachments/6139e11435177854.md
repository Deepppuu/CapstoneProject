# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - link "BookEase" [ref=e5]:
        - /url: index.html
      - list [ref=e7]:
        - listitem [ref=e8]:
          - link "Home" [ref=e9]:
            - /url: index.html
        - listitem [ref=e10]:
          - link "Services" [ref=e11]:
            - /url: services.html
        - listitem [ref=e12]:
          - link "My Bookings" [ref=e13]:
            - /url: bookings.html
        - listitem [ref=e14]:
          - link "Profile" [ref=e15]:
            - /url: profile.html
        - listitem [ref=e16]:
          - link "Login" [ref=e17] [cursor=pointer]:
            - /url: login.html
  - generic [ref=e18]:
    - heading "Confirm Your Booking" [level=3] [ref=e19]
    - generic [ref=e22]:
      - generic [ref=e24]: Service
      - generic [ref=e26]: Date
      - generic [ref=e28]: Time
      - generic [ref=e29]:
        - generic [ref=e30]: Amount
        - generic [ref=e31]: ₹
      - button "Confirm Booking & Proceed to Payment" [ref=e32] [cursor=pointer]
      - button "Cancel" [ref=e33] [cursor=pointer]
```